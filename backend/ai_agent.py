import json
import os
import logging
from pydantic import BaseModel, Field
from typing import Optional, List

logger = logging.getLogger("dukaanai.ai_agent")

# --- AI Prompt Design Choices & Comments ---
#
# 1. Multilingual Handling (Hindi, Hinglish, English):
# Small business customers in India often mix languages (Code-mixing).
# We instruct the LLM to output its response in the SAME language/script as the user's input,
# but default to Romanized Hinglish (e.g., "Aapko kya chahiye?") if unsure, as it's the most common denominator.
#
# 2. Intent Detection:
# Instead of multiple round-trips, we use Function Calling (or JSON output mode) to classify intent
# AND generate the response simultaneously. The intents help the frontend UI badge conversations correctly.
#
# 3. Order Extraction (Structured JSON):
# The LLM is given strict schema instructions to extract items, quantities, and prices when the 
# user intent is "order_placement". If any info is missing (like delivery address), the LLM 
# is instructed to ask for it naturally before confirming the order.
#
# 4. Graceful Fallback (Human Handover):
# If the LLM doesn't know an answer (e.g., specific price not in FAQ), it sets `confidence` < 0.7 
# and `needs_attention = True`, pausing its automation so the shop owner can reply manually.
# -------------------------------------------

class ExtractedItem(BaseModel):
    name: str
    quantity: int
    unit_price: Optional[float] = None

class AIResponseFormat(BaseModel):
    intent: str = Field(description="One of: 'price_inquiry', 'order_placement', 'complaint', 'general_question', 'hours_query', 'greeting'")
    response_text: str = Field(description="The natural language response to send back to the user via WhatsApp.")
    needs_attention: bool = Field(description="True if the AI is unsure, doesn't know the answer, or the user is complaining.")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0.")
    extracted_order: Optional[List[ExtractedItem]] = Field(description="List of items if an order is being placed, else null.")
    delivery_address: Optional[str] = Field(description="Extracted delivery address if provided by user, else null.")

SYSTEM_PROMPT_TEMPLATE = """
You are the AI assistant for "{business_name}", a {business_type}.
Your goal is to handle WhatsApp customer queries politely, accurately, and naturally.

BUSINESS RULES & FAQS:
Working Hours: {working_hours}
FAQs: {faqs}

CRITICAL INSTRUCTIONS:
1. LANGUAGE: Respond in the EXACT same language and script the user uses. 
   - If they type in English, reply in English.
   - If they type in Hindi script (Devanagari), reply in Hindi script.
   - If they type in Roman Hinglish ("bhai price kya hai"), reply in natural Hinglish.
2. TONE: {tone}
3. KNOWLEDGE LIMITS: Do NOT guess prices, stock, or policies. If a user asks something not in the FAQs or Business Rules, set `needs_attention` to true and reply: "I'll need to check that for you. Please give me a moment and the shop owner will reply shortly."
4. ORDER EXTRACTION: If the user is placing an order, extract the items and quantities. If the delivery address is missing, politely ask for it in your `response_text`.
"""

class MockAIAgent:
    """
    Mock implementation of the AI Agent for Phase 1/2.
    In production, this would call OpenAI (gpt-4o) or Anthropic (claude-3.5-sonnet) with structured outputs.
    """
    async def process_message(
        self, 
        user_message: str, 
        business_config: dict, 
        conversation_history: list
    ) -> AIResponseFormat:
        
        # Here we would normally build the prompt and call the LLM API.
        # e.g., response = await openai.chat.completions.create(...)
        
        # MOCK LOGIC for demonstration
        user_message_lower = user_message.lower()
        
        intent = "general_question"
        needs_attention = False
        confidence = 0.9
        extracted_order = None
        delivery_address = None
        response_text = ""

        if "price" in user_message_lower or "kitne ka" in user_message_lower or "kya hai" in user_message_lower:
            intent = "price_inquiry"
            response_text = "Its starting from ₹500. Which one would you like to see?"
            
        elif "cancel" in user_message_lower or "defective" in user_message_lower or "complaint" in user_message_lower:
            intent = "complaint"
            needs_attention = True
            confidence = 0.4
            response_text = "I'm sorry to hear that. I will have the shop owner look into this immediately."
            
        elif "order" in user_message_lower or "buy" in user_message_lower or "bhej do" in user_message_lower:
            intent = "order_placement"
            extracted_order = [ExtractedItem(name="Sample Item", quantity=1)]
            if "address" in user_message_lower or "nagar" in user_message_lower:
                delivery_address = "Extracted Address"
                response_text = "Your order is confirmed! We will deliver it soon."
            else:
                response_text = "I have noted your order. Please share your delivery address."
                
        elif "time" in user_message_lower or "khula" in user_message_lower or "open" in user_message_lower:
            intent = "hours_query"
            response_text = "We are open from 10 AM to 8 PM."
            
        else:
            response_text = "Hello! How can I help you today?"
            intent = "greeting"

        return AIResponseFormat(
            intent=intent,
            response_text=response_text,
            needs_attention=needs_attention,
            confidence=confidence,
            extracted_order=extracted_order,
            delivery_address=delivery_address
        )

class RealAIAgent:
    """
    Real AI Agent using the OpenAI SDK.
    Supports both OpenAI and Google Gemini (via OpenAI-compatible endpoint).
    """
    def __init__(self):
        try:
            from openai import AsyncOpenAI
        except ImportError:
            raise RuntimeError("openai SDK not installed. Run: pip install openai")
        
        self.gemini_mode = os.environ.get("GEMINI_MODE", "false").lower() == "true"
        self.model = os.environ.get("AI_MODEL", "gemini-2.0-flash" if self.gemini_mode else "gpt-4o")
        
        if self.gemini_mode:
            api_key = os.environ.get("OPENAI_API_KEY")
            if not api_key:
                raise RuntimeError("OPENAI_API_KEY must be set (using your Gemini key) when GEMINI_MODE=true.")
            self.client = AsyncOpenAI(
                api_key=api_key,
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
            )
        else:
            api_key = os.environ.get("OPENAI_API_KEY")
            if not api_key:
                raise RuntimeError("OPENAI_API_KEY must be set for RealAIAgent.")
            self.client = AsyncOpenAI(api_key=api_key)

    async def process_message(
        self, 
        user_message: str, 
        business_config: dict, 
        conversation_history: list
    ) -> AIResponseFormat:
        
        system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
            business_name=business_config.get("name", "Store"),
            business_type=business_config.get("type", "retail"),
            working_hours=business_config.get("working_hours", "10 AM to 8 PM"),
            faqs=business_config.get("faqs", "No specific FAQs provided."),
            tone=business_config.get("tone", "friendly")
        )

        schema_json = AIResponseFormat.model_json_schema()
        
        system_prompt += f"\n\nYou MUST return your response as a valid JSON object matching exactly this JSON schema:\n{json.dumps(schema_json)}"
        
        messages = [{"role": "system", "content": system_prompt}]
        for msg in conversation_history:
            # Assuming conversation_history is a list of dicts with 'sender_type' and 'content'
            role = "assistant" if msg.get("sender_type") == "ai" else "user"
            messages.append({"role": role, "content": msg.get("content", "")})
        
        messages.append({"role": "user", "content": user_message})

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                response_format={"type": "json_object"}
            )
            raw_json = response.choices[0].message.content
            parsed = json.loads(raw_json)
            return AIResponseFormat(**parsed)
        except Exception as e:
            logger.error(f"AI API Error: {e}")
            # Fallback response
            return AIResponseFormat(
                intent="general_question",
                response_text="I'm sorry, I'm having trouble processing that right now. Let me pass this to the shop owner.",
                needs_attention=True,
                confidence=0.0,
                extracted_order=None,
                delivery_address=None
            )

def get_ai_agent():
    mode = os.environ.get("AI_MODE", "mock").lower()
    if mode == "real":
        logger.info("Using RealAIAgent")
        return RealAIAgent()
    else:
        logger.info("Using MockAIAgent")
        return MockAIAgent()

