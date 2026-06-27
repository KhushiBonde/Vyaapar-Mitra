from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from . import models, schemas, database
from .ai_agent import MockAIAgent

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="DukaanAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_agent = MockAIAgent()

@app.get("/")
def read_root():
    return {"message": "Welcome to DukaanAI API"}

@app.post("/api/businesses", response_model=schemas.BusinessResponse)
def create_business(business: schemas.BusinessCreate, db: Session = Depends(database.get_db)):
    db_business = db.query(models.Business).filter(models.Business.email == business.email).first()
    if db_business:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_business = models.Business(
        email=business.email,
        phone_number=business.phone_number,
        password_hash="fakehash", # In production, hash this
        business_name=business.business_name
    )
    db.add(new_business)
    db.commit()
    db.refresh(new_business)
    return new_business

@app.post("/api/webhook/whatsapp")
async def whatsapp_webhook(payload: schemas.WebhookPayload, db: Session = Depends(database.get_db)):
    """
    Mock endpoint to simulate receiving a WhatsApp message from a customer.
    """
    business = db.query(models.Business).filter(models.Business.id == payload.business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    customer = db.query(models.Customer).filter(models.Customer.whatsapp_number == payload.whatsapp_number).first()
    if not customer:
        customer = models.Customer(business_id=business.id, whatsapp_number=payload.whatsapp_number)
        db.add(customer)
        db.commit()
        db.refresh(customer)

    conversation = db.query(models.Conversation).filter(
        models.Conversation.customer_id == customer.id,
        models.Conversation.status != models.ConversationStatus.resolved
    ).first()

    if not conversation:
        conversation = models.Conversation(business_id=business.id, customer_id=customer.id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # 1. Save inbound message
    inbound_msg = models.Message(
        conversation_id=conversation.id,
        sender_type=models.SenderType.customer,
        content=payload.message
    )
    db.add(inbound_msg)
    
    # Update conversation
    conversation.last_message_at = datetime.utcnow()
    db.commit()

    if conversation.status == models.ConversationStatus.paused:
        return {"status": "Message received, conversation is paused for human reply"}

    # 2. Call AI Agent
    ai_response = await ai_agent.process_message(
        user_message=payload.message,
        business_config={"name": business.business_name, "type": business.business_type.value},
        conversation_history=[] # In prod, fetch recent messages here
    )

    # 3. Save outbound AI message
    outbound_msg = models.Message(
        conversation_id=conversation.id,
        sender_type=models.SenderType.ai,
        content=ai_response.response_text,
        intent=ai_response.intent,
        confidence=ai_response.confidence
    )
    db.add(outbound_msg)

    # Update conversation based on AI needs
    if ai_response.needs_attention:
        conversation.needs_attention = True
        conversation.status = models.ConversationStatus.paused

    # Handle orders
    if ai_response.extracted_order:
        new_order = models.Order(
            business_id=business.id,
            customer_id=customer.id,
            items=[item.model_dump() for item in ai_response.extracted_order],
            delivery_address=ai_response.delivery_address,
            total_amount=sum(item.unit_price or 0 for item in ai_response.extracted_order)
        )
        db.add(new_order)

    db.commit()

    # In production, we would call the Twilio/Meta API here to send `ai_response.response_text`
    return {"status": "success", "ai_response": ai_response.response_text}

@app.get("/api/conversations", response_model=list[schemas.ConversationResponse])
def get_conversations(business_id: str, db: Session = Depends(database.get_db)):
    conversations = db.query(models.Conversation).filter(models.Conversation.business_id == business_id).all()
    return conversations
