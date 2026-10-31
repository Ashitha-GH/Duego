from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey,
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