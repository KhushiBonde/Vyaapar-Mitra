from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime, Float, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID as PGUUID
import uuid
import datetime
from .database import Base
import enum

class BusinessType(str, enum.Enum):
    retail = "retail"
    restaurant = "restaurant"
    service = "service"

class ToneType(str, enum.Enum):
    formal = "formal"
    friendly = "friendly"

class Business(Base):
    __tablename__ = "businesses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    phone_number = Column(String, unique=True, index=True)
    password_hash = Column(String)
    business_name = Column(String)
    business_type = Column(SQLEnum(BusinessType), default=BusinessType.retail)
    whatsapp_number = Column(String)
    working_hours = Column(JSON)
    preferred_language = Column(String, default="hinglish")
    tone = Column(SQLEnum(ToneType), default=ToneType.friendly)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversations = relationship("Conversation", back_populates="business")
    orders = relationship("Order", back_populates="business")

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    business_id = Column(String, ForeignKey("businesses.id"))
    whatsapp_number = Column(String, index=True)
    name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversations = relationship("Conversation", back_populates="customer")

class ConversationStatus(str, enum.Enum):
    active = "active"
    paused = "paused"
    resolved = "resolved"

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    business_id = Column(String, ForeignKey("businesses.id"))
    customer_id = Column(String, ForeignKey("customers.id"))
    status = Column(SQLEnum(ConversationStatus), default=ConversationStatus.active)
    needs_attention = Column(Boolean, default=False)
    last_message_at = Column(DateTime, default=datetime.datetime.utcnow)

    business = relationship("Business", back_populates="conversations")
    customer = relationship("Customer", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")

class SenderType(str, enum.Enum):
    customer = "customer"
    ai = "ai"
    human = "human"

class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.id"))
    sender_type = Column(SQLEnum(SenderType))
    content = Column(String)
    intent = Column(String, nullable=True)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("Conversation", back_populates="messages")

class OrderStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    fulfilled = "fulfilled"
    cancelled = "cancelled"

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    business_id = Column(String, ForeignKey("businesses.id"))
    customer_id = Column(String, ForeignKey("customers.id"))
    items = Column(JSON)
    total_amount = Column(Float, default=0.0)
    delivery_address = Column(String, nullable=True)
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.pending)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    business = relationship("Business", back_populates="orders")
