from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime
from .models import BusinessType, ToneType, ConversationStatus, SenderType, OrderStatus

# --- Schemas ---

class BusinessCreate(BaseModel):
    email: str
    phone_number: str
    password: str
    business_name: str

class BusinessResponse(BaseModel):
    id: str
    email: str
    business_name: str
    business_type: BusinessType
    whatsapp_number: Optional[str]
    preferred_language: str
    tone: ToneType

    class Config:
        from_attributes = True

class WebhookPayload(BaseModel):
    whatsapp_number: str
    business_id: str
    message: str

class MessageResponse(BaseModel):
    id: str
    sender_type: SenderType
    content: str
    intent: Optional[str]
    confidence: Optional[float]
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationResponse(BaseModel):
    id: str
    customer_id: str
    status: ConversationStatus
    needs_attention: bool
    last_message_at: datetime
    messages: List[MessageResponse] = []

    class Config:
        from_attributes = True
