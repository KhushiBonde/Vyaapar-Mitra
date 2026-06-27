# ─── WhatsApp Integration Abstraction Layer ─────────────────────────────────
#
# This module provides a clean abstraction over WhatsApp messaging providers.
# The goal is that swapping from Twilio → Meta Cloud API (or vice versa)
# only requires changing the active provider class, not the rest of the codebase.
#
# Usage:
#   from .whatsapp import get_whatsapp_provider
#   wp = get_whatsapp_provider()
#   await wp.send_message(to="+919876543210", body="Hello!")
#
# Supported providers (set via WHATSAPP_PROVIDER env var):
#   - "mock"   — Local dev/testing, logs messages to console instead of sending
#   - "twilio" — Twilio WhatsApp Business API
#   - "meta"   — Meta WhatsApp Cloud API (recommended for production)
# ─────────────────────────────────────────────────────────────────────────────

import asyncio
import os
import logging
from abc import ABC, abstractmethod
from typing import Optional

try:
    import httpx as _httpx
except ImportError:  # pragma: no cover
    _httpx = None  # type: ignore

logger = logging.getLogger("dukaanai.whatsapp")


class WhatsAppProvider(ABC):
    """Abstract base class for all WhatsApp messaging providers."""

    @abstractmethod
    async def send_message(self, to: str, body: str, media_url: Optional[str] = None) -> str:
        """
        Send a WhatsApp message.

        Args:
            to:        Recipient WhatsApp number in E.164 format (e.g. +919876543210)
            body:      Text content of the message
            media_url: Optional URL to a media attachment (image, PDF etc.)

        Returns:
            A string message ID from the provider (for logging/tracking)
        """
        ...

    @abstractmethod
    async def get_delivery_status(self, message_id: str) -> str:
        """Check delivery status of a previously sent message."""
        ...


# ─── Provider: Mock (Local Dev) ───────────────────────────────────────────────

class MockWhatsAppProvider(WhatsAppProvider):
    """
    Mock provider for local development and testing.
    Logs messages to the console instead of actually sending them.
    This is the DEFAULT provider — no credentials needed.
    """

    async def send_message(self, to: str, body: str, media_url: Optional[str] = None) -> str:
        mock_id = f"mock-msg-{os.urandom(4).hex()}"
        logger.info(f"[MockWhatsApp] → {to}: {body[:80]}{'...' if len(body) > 80 else ''}")
        print(f"\n📱 [WhatsApp Mock] To: {to}\n   Message: {body}\n   Message ID: {mock_id}\n")
        return mock_id

    async def get_delivery_status(self, message_id: str) -> str:
        return "delivered"


# ─── Provider: Twilio ────────────────────────────────────────────────────────

class TwilioWhatsAppProvider(WhatsAppProvider):
    """
    Twilio WhatsApp Business API provider.

    Required env vars:
        TWILIO_ACCOUNT_SID  — Your Twilio account SID
        TWILIO_AUTH_TOKEN   — Your Twilio auth token
        TWILIO_FROM_NUMBER  — Twilio WhatsApp number (e.g. +14155238886)

    Docs: https://www.twilio.com/docs/whatsapp
    """

    def __init__(self):
        try:
            from twilio.rest import Client
            self.client = Client(
                os.environ["TWILIO_ACCOUNT_SID"],
                os.environ["TWILIO_AUTH_TOKEN"]
            )
            self.from_number = f"whatsapp:{os.environ['TWILIO_FROM_NUMBER']}"
        except ImportError:
            raise RuntimeError("Twilio SDK not installed. Run: pip install twilio")
        except KeyError as e:
            raise RuntimeError(f"Missing required env var for Twilio: {e}")

    async def send_message(self, to: str, body: str, media_url: Optional[str] = None) -> str:
        kwargs = {
            "from_": self.from_number,
            "to": f"whatsapp:{to}",
            "body": body,
        }
        if media_url:
            kwargs["media_url"] = [media_url]

        # Twilio SDK is synchronous — run in a thread to avoid blocking the event loop.
        message = await asyncio.to_thread(self.client.messages.create, **kwargs)
        logger.info(f"[Twilio] Sent to {to}, SID: {message.sid}")
        return message.sid

    async def get_delivery_status(self, message_id: str) -> str:
        # Also blocking — offload to thread.
        message = await asyncio.to_thread(self.client.messages(message_id).fetch)
        return message.status


# ─── Provider: Meta Cloud API ─────────────────────────────────────────────────

class MetaCloudWhatsAppProvider(WhatsAppProvider):
    """
    Meta WhatsApp Cloud API provider (recommended for production in India).

    Required env vars:
        META_ACCESS_TOKEN    — Permanent system user token
        META_PHONE_NUMBER_ID — Phone Number ID from Meta Developer Console

    Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
    """

    def __init__(self):
        if _httpx is None:
            raise RuntimeError("httpx not installed. Run: pip install httpx")

        self.token = os.environ.get("META_ACCESS_TOKEN")
        self.phone_id = os.environ.get("META_PHONE_NUMBER_ID")

        # Validate credentials BEFORE using phone_id to build the URL.
        if not self.token or not self.phone_id:
            raise RuntimeError("META_ACCESS_TOKEN and META_PHONE_NUMBER_ID must be set.")

        self.api_base = f"https://graph.facebook.com/v19.0/{self.phone_id}/messages"

    async def send_message(self, to: str, body: str, media_url: Optional[str] = None) -> str:
        # Strip leading + for Meta API
        to_clean = to.lstrip("+")
        payload = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": to_clean,
            "type": "text",
            "text": {"preview_url": False, "body": body},
        }
        async with _httpx.AsyncClient() as client:
            resp = await client.post(
                self.api_base,
                json=payload,
                headers={"Authorization": f"Bearer {self.token}"}
            )
            resp.raise_for_status()
            data = resp.json()
            msg_id = data["messages"][0]["id"]
            logger.info(f"[Meta] Sent to {to}, ID: {msg_id}")
            return msg_id

    async def get_delivery_status(self, message_id: str) -> str:
        # Status updates come via webhook in real usage; poll is a fallback
        async with _httpx.AsyncClient() as client:
            resp = await client.get(
                f"https://graph.facebook.com/v19.0/{message_id}",
                headers={"Authorization": f"Bearer {self.token}"}
            )
            resp.raise_for_status()
            return resp.json().get("status", "unknown")


# ─── Factory ─────────────────────────────────────────────────────────────────

def get_whatsapp_provider() -> WhatsAppProvider:
    """
    Factory function: returns the correct provider based on WHATSAPP_PROVIDER env var.
    Defaults to MockWhatsAppProvider for safe local development.
    """
    provider_name = os.environ.get("WHATSAPP_PROVIDER", "mock").lower()

    if provider_name == "twilio":
        logger.info("Using Twilio WhatsApp provider")
        return TwilioWhatsAppProvider()
    elif provider_name == "meta":
        logger.info("Using Meta Cloud API WhatsApp provider")
        return MetaCloudWhatsAppProvider()
    else:
        logger.info("Using Mock WhatsApp provider (local dev mode)")
        return MockWhatsAppProvider()
