from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey,
    Boolean,
    Text,
    JSON,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    documents = relationship(
        "Document",
        back_populates="owner",
        cascade="all, delete-orphan",
    )


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    name = Column(String, nullable=False)

    document_type = Column(
        String,
        nullable=False,
    )

    description = Column(
        String,
        nullable=True,
    )

    issue_date = Column(
        Date,
        nullable=True,
    )

    expiry_date = Column(
        Date,
        nullable=True,
    )
    file_name = Column(
        String,
        nullable=True,
    )

    file_path = Column(
        String,
        nullable=True,
    )

    owner = relationship(
        "User",
        back_populates="documents",
    )
    payments = relationship(
        "Payment",
        back_populates="document",
    	cascade="all, delete-orphan",
    )
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    document_id = Column(
        Integer,
        ForeignKey("documents.id"),
        nullable=False,
    )

    amount = Column(
        Integer,
        nullable=False,
    )

    due_date = Column(
        Date,
        nullable=False,
    )

    status = Column(
        String,
        nullable=False,
        default="PENDING",
    )

    description = Column(
        String,
        nullable=True,
    )

    document = relationship(
        "Document",
        back_populates="payments",
    )
class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    document_id = Column(
        Integer,
        ForeignKey("documents.id"),
        nullable=True,
    )

    payment_id = Column(
        Integer,
        ForeignKey("payments.id"),
        nullable=True,
    )

    reminder_date = Column(
        Date,
        nullable=False,
    )

    message = Column(
        String,
        nullable=False,
    )

    status = Column(
        String,
        nullable=False,
        default="PENDING",
    )
class DocumentAnalysis(Base):
    __tablename__ = "document_analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    document_id = Column(
        Integer,
        ForeignKey("documents.id"),
        nullable=False,
    )

    summary = Column(
        String,
        nullable=True,
    )

    risk_level = Column(
        String,
        nullable=True,
    )

    risk_reason = Column(
        String,
        nullable=True,
    )

    extracted_text = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

class PaymentRecipient(Base):
    __tablename__ = "payment_recipients"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    recipient_type = Column(
        String,
        nullable=False,
    )  # FREELANCER, VENDOR, BUSINESS

    name = Column(String, nullable=False)

    upi_id = Column(String, nullable=True)

    gateway_account_id = Column(
        String,
        nullable=True,
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"

    id = Column(Integer, primary_key=True, index=True)

    payment_id = Column(
        Integer,
        ForeignKey("payments.id"),
        nullable=False,
    )

    recipient_id = Column(
        Integer,
        ForeignKey("payment_recipients.id"),
        nullable=False,
    )

    transaction_reference = Column(
        String,
        unique=True,
        nullable=False,
    )

    payment_method = Column(
        String,
        nullable=False,
    )  # DIRECT_UPI or GATEWAY

    selected_upi_app = Column(
        String,
        nullable=True,
    )

    gateway_provider = Column(
        String,
        nullable=True,
    )

    gateway_order_id = Column(
        String,
        nullable=True,
    )

    gateway_payment_id = Column(
        String,
        nullable=True,
    )

    amount = Column(
        Integer,
        nullable=False,
    )

    currency = Column(
        String,
        nullable=False,
        default="INR",
    )

    status = Column(
        String,
        nullable=False,
        default="INITIATED",
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

class PaymentVerification(Base):
    __tablename__ = "payment_verifications"

    id = Column(Integer, primary_key=True, index=True)

    transaction_id = Column(
        Integer,
        ForeignKey("payment_transactions.id"),
        nullable=False,
    )

    verification_method = Column(
        String,
        nullable=False,
    )  # WEBHOOK, PROVIDER_API, MANUAL

    status = Column(
        String,
        nullable=False,
        default="PENDING",
    )  # PENDING, VERIFIED, REJECTED

    provider_reference = Column(
        String,
        nullable=True,
    )

    verified_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
    )

    verified_at = Column(
        DateTime,
        nullable=True,
    )

    remarks = Column(
        Text,
        nullable=True,
    )


class PaymentEvent(Base):
    __tablename__ = "payment_events"

    id = Column(Integer, primary_key=True, index=True)

    transaction_id = Column(
        Integer,
        ForeignKey("payment_transactions.id"),
        nullable=False,
    )

    event_type = Column(
        String,
        nullable=False,
    )

    source = Column(
        String,
        nullable=False,
    )  # GATEWAY, UPI, MANUAL

    event_reference = Column(
        String,
        nullable=True,
    )

    event_metadata = Column(
        JSON,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class WebhookEvent(Base):
    __tablename__ = "webhook_events"

    id = Column(Integer, primary_key=True, index=True)

    provider = Column(
        String,
        nullable=False,
    )

    event_id = Column(
        String,
        nullable=False,
    )

    event_type = Column(
        String,
        nullable=False,
    )

    processing_status = Column(
        String,
        nullable=False,
        default="RECEIVED",
    )

    received_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )

    processed_at = Column(
        DateTime,
        nullable=True,
    )

    __table_args__ = (
        UniqueConstraint(
            "provider",
            "event_id",
            name="uq_webhook_provider_event",
        ),
    )

class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False, unique=True)

    description = Column(Text, nullable=True)

    price = Column(Integer, nullable=False)

    billing_cycle = Column(
        String,
        nullable=False,
    )  # MONTHLY, YEARLY

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    plan_id = Column(
        Integer,
        ForeignKey("subscription_plans.id"),
        nullable=False,
    )

    status = Column(
        String,
        nullable=False,
        default="PENDING",
    )  # PENDING, ACTIVE, CANCELLED, EXPIRED

    start_date = Column(DateTime, nullable=True)

    end_date = Column(DateTime, nullable=True)

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class SubscriptionTransaction(Base):
    __tablename__ = "subscription_transactions"

    id = Column(Integer, primary_key=True, index=True)

    subscription_id = Column(
        Integer,
        ForeignKey("subscriptions.id"),
        nullable=False,
    )

    transaction_reference = Column(
        String,
        unique=True,
        nullable=False,
    )

    gateway_provider = Column(
        String,
        nullable=True,
    )

    gateway_order_id = Column(
        String,
        nullable=True,
    )

    gateway_payment_id = Column(
        String,
        nullable=True,
    )

    amount = Column(
        Integer,
        nullable=False,
    )

    currency = Column(
        String,
        nullable=False,
        default="INR",
    )

    status = Column(
        String,
        nullable=False,
        default="INITIATED",
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )