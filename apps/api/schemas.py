from datetime import date, datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    model_config = ConfigDict(from_attributes=True)


class DocumentCreate(BaseModel):
    name: str
    document_type: str
    description: str | None = None
    issue_date: date | None = None
    expiry_date: date | None = None


class DocumentUpdate(BaseModel):
    name: str | None = None
    document_type: str | None = None
    description: str | None = None
    issue_date: date | None = None
    expiry_date: date | None = None

class PaymentCreate(BaseModel):
    document_id: int
    amount: int
    due_date: date
    status: str = "PENDING"
    description: str | None = None


class PaymentUpdate(BaseModel):
    amount: int | None = None
    due_date: date | None = None
    status: str | None = None
    description: str | None = None
class ReminderCreate(BaseModel):
    document_id: int | None = None
    payment_id: int | None = None
    reminder_date: date
    message: str


class ReminderUpdate(BaseModel):
    reminder_date: date | None = None
    message: str | None = None
    status: str | None = None

    model_config = ConfigDict(from_attributes=True)


class DocumentAnalysisResponse(BaseModel):
    id: int
    document_id: int
    summary: str | None = None
    risk_level: str | None = None
    risk_reason: str | None = None
    extracted_text: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
