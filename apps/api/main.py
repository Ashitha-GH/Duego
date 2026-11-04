import os
import uuid

import json

from pypdf import PdfReader
from docx import Document as DocxDocument

from datetime import datetime, timedelta, timezone

from dotenv import load_dotenv
from google import genai
from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
    UploadFile,
    File,
)
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pwdlib import PasswordHash
from sqlalchemy.orm import Session

import models
from database import get_db
from schemas import (
    UserCreate,
    UserResponse,
    UserLogin,
    DocumentCreate,
    DocumentUpdate,
    PaymentCreate,
    PaymentUpdate,
    ReminderCreate,
    ReminderUpdate,
    DocumentAnalysisResponse,
)

# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing from the .env file")

gemini_client = genai.Client(api_key=GEMINI_API_KEY)
GEMINI_MODEL = "gemini-3.6-flash"

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is missing from the .env file")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# =========================================================
# DOCUMENT TEXT EXTRACTION
# =========================================================

def extract_document_text(file_path: str) -> str:

    file_extension = os.path.splitext(file_path)[1].lower()

    if file_extension == ".txt":

        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()

    elif file_extension == ".pdf":

        reader = PdfReader(file_path)

        extracted_text = []

        for page in reader.pages:
            extracted_text.append(
                page.extract_text() or ""
            )

        return "\n".join(extracted_text)

    elif file_extension == ".docx":

        document = DocxDocument(file_path)

        extracted_text = []

        for paragraph in document.paragraphs:
            extracted_text.append(paragraph.text)

        return "\n".join(extracted_text)

    else:
        raise ValueError("Unsupported document format")


# =========================================================
# GEMINI DOCUMENT ANALYSIS
# =========================================================

def generate_document_analysis(extracted_text: str) -> dict:
    prompt = f"""
    You are an AI business document analyst.

    Analyze the following business document.

    Return ONLY valid JSON in this exact format:
    {{
        "summary": "A clear summary of the document",
        "risk_level": "LOW, MEDIUM, or HIGH",
        "risk_reason": "Explain the risks identified in the document"
    }}

    Rules:
    - Identify important business and payment risks.
    - Look for unclear terms, missing information, and potential obligations.
    - Do not invent information that is not present in the document.
    - If no significant risks are found, use LOW.
    - Do not provide definitive legal advice.

    DOCUMENT TEXT:
    {extracted_text}
    """

    response = gemini_client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config={"response_mime_type": "application/json"},
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response")

    result = json.loads(response.text)

    if not isinstance(result, dict):
        raise ValueError("Gemini returned an invalid response")

    return result

# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Duego API",
    version="0.1.0",
)


# =========================================================
# PASSWORD + AUTHENTICATION
# =========================================================

password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/users/login"
)


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        user_id = int(user_id)

    except (JWTError, ValueError):
        raise credentials_exception

    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if user is None:
        raise credentials_exception

    return user


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "Duego API",
    }


# =========================================================
# USER REGISTRATION
# =========================================================

@app.post(
    "/users/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(models.User)
        .filter(models.User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )

    hashed_password = password_hash.hash(user.password)

    new_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =========================================================
# USER LOGIN
# =========================================================

@app.post("/users/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(models.User)
        .filter(models.User.email == form_data.username)
        .first()
    )

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not password_hash.verify(
        form_data.password,
        existing_user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        {"sub": str(existing_user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


# =========================================================
# CURRENT USER PROFILE
# =========================================================

@app.get(
    "/users/me",
    response_model=UserResponse,
)
def get_my_profile(
    current_user: models.User = Depends(get_current_user),
):
    return current_user


# =========================================================
# GET ALL DOCUMENTS
# =========================================================

@app.get("/documents")
def get_documents(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    return documents


# =========================================================
# CREATE DOCUMENT
# =========================================================

@app.post(
    "/documents",
    status_code=status.HTTP_201_CREATED,
)
def create_document(
    document: DocumentCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    new_document = models.Document(
        user_id=current_user.id,
        name=document.name,
        document_type=document.document_type,
        description=document.description,
        issue_date=document.issue_date,
        expiry_date=document.expiry_date,
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return new_document
# =========================================================
# GET DEADLINE SUMMARY
# =========================================================

@app.get("/documents/deadline-summary")
def get_deadline_summary(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    total_documents = len(documents)

    active = 0
    due_soon = 0
    expired = 0
    no_deadline = 0

    today = datetime.now(timezone.utc).date()

    for document in documents:

        if document.expiry_date is None:
            no_deadline += 1
            continue

        days_remaining = (
            document.expiry_date - today
        ).days

        if days_remaining < 0:
            expired += 1

        elif days_remaining <= 30:
            due_soon += 1

        else:
            active += 1

    return {
        "total_documents": total_documents,
        "active": active,
        "due_soon": due_soon,
        "expired": expired,
        "no_deadline": no_deadline,
    }

# =========================================================
# GET UPCOMING DEADLINES
# =========================================================

# =========================================================
# GET UPCOMING DEADLINES
# =========================================================

@app.get("/documents/upcoming-deadlines")
def get_upcoming_deadlines(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    today = datetime.now(timezone.utc).date()

    upcoming_deadlines = []

    for document in documents:

        if document.expiry_date is None:
            continue

        days_remaining = (
            document.expiry_date - today
        ).days

        if 0 <= days_remaining <= 30:

            if days_remaining <= 7:
                priority = "HIGH"

            elif days_remaining <= 15:
                priority = "MEDIUM"

            else:
                priority = "LOW"

            upcoming_deadlines.append({
                "document_id": document.id,
                "name": document.name,
                "document_type": document.document_type,
                "expiry_date": document.expiry_date,
                "days_remaining": days_remaining,
                "priority": priority,
            })

    upcoming_deadlines.sort(
        key=lambda item: item["days_remaining"]
    )

    return upcoming_deadlines
# =========================================================
# GET DEADLINE STATUS FOR ALL DOCUMENTS
# =========================================================

@app.get("/documents/deadlines")
def get_all_document_deadlines(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    today = datetime.now(timezone.utc).date()

    results = []

    for document in documents:

        if document.expiry_date is None:
            deadline_status = "NO_DEADLINE"
            days_remaining = None

        else:
            days_remaining = (
                document.expiry_date - today
            ).days

            if days_remaining < 0:
                deadline_status = "EXPIRED"

            elif days_remaining <= 30:
                deadline_status = "DUE_SOON"

            else:
                deadline_status = "ACTIVE"

        results.append({
            "document_id": document.id,
            "name": document.name,
            "document_type": document.document_type,
            "expiry_date": document.expiry_date,
            "status": deadline_status,
            "days_remaining": days_remaining,
        })

    return results

# =========================================================
# GET SINGLE DOCUMENT
# =========================================================

@app.get("/documents/{document_id}")
def get_document(
    document_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    return document

# =========================================================
# GET DOCUMENT ANALYSIS
# =========================================================

@app.get(
    "/documents/{document_id}/analysis",
    response_model=list[DocumentAnalysisResponse],

)
def get_document_analysis(
    document_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    analyses = (
        db.query(models.DocumentAnalysis)
        .filter(
            models.DocumentAnalysis.document_id == document_id
        )
        .order_by(models.DocumentAnalysis.created_at.desc())
        .all()
    )

    return analyses
# =========================================================
# GET DOCUMENT DEADLINE STATUS
# =========================================================

@app.get("/documents/{document_id}/deadline")
def get_document_deadline(
    document_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    if document.expiry_date is None:
        return {
            "document_id": document.id,
            "expiry_date": None,
            "status": "NO_DEADLINE",
            "days_remaining": None,
        }

    today = datetime.now(timezone.utc).date()

    days_remaining = (
        document.expiry_date - today
    ).days

    if days_remaining < 0:
        deadline_status = "EXPIRED"

    elif days_remaining <= 30:
        deadline_status = "DUE_SOON"

    else:
        deadline_status = "ACTIVE"

    return {
        "document_id": document.id,
        "expiry_date": document.expiry_date,
        "status": deadline_status,
        "days_remaining": days_remaining,
    }


# =========================================================
# UPDATE DOCUMENT
# =========================================================

@app.put("/documents/{document_id}")
def update_document(
    document_id: int,
    document: DocumentUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if existing_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    update_data = document.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            existing_document,
            field,
            value,
        )

    db.commit()
    db.refresh(existing_document)

    return existing_document


# =========================================================
# DELETE DOCUMENT
# =========================================================

@app.delete("/documents/{document_id}")
def delete_document(
    document_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    if (
        document.file_path
        and os.path.exists(document.file_path)
    ):
        os.remove(document.file_path)

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully"
    }


# =========================================================
# UPLOAD DOCUMENT FILE
# =========================================================

@app.post(
    "/documents/upload",
    status_code=status.HTTP_201_CREATED,
)
def upload_document(
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    allowed_extensions = {
        ".pdf",
        ".docx",
        ".txt",
    }

    original_filename = file.filename or ""

    file_extension = os.path.splitext(
        original_filename
    )[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Only PDF, DOCX, and TXT files are allowed"
            ),
        )

    upload_directory = "uploads"

    os.makedirs(
        upload_directory,
        exist_ok=True,
    )

    safe_filename = (
        f"{uuid.uuid4()}_"
        f"{os.path.basename(original_filename)}"
    )

    file_path = os.path.join(
        upload_directory,
        safe_filename,
    )

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    new_document = models.Document(
        user_id=current_user.id,
        name=safe_filename,
        document_type=file_extension.replace(
            ".",
            "",
        ).upper(),
        file_name=safe_filename,
        file_path=file_path,
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return {
        "message": "Document uploaded successfully",
        "document_id": new_document.id,
        "filename": safe_filename,
        "file_path": file_path,
    }

# =========================================================
# GENERATE DOCUMENT ANALYSIS
# =========================================================

@app.post(
    "/documents/{document_id}/analyze",
    response_model=DocumentAnalysisResponse,
)
def analyze_document(
    document_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    if (
        not document.file_path
        or not os.path.exists(document.file_path)
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Uploaded document file not found",
        )

    try:
        extracted_text = extract_document_text(
            document.file_path
        )

    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Could not extract document text: {str(error)}",
        )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No readable text found in the document",
        )

        # Generate AI analysis using Gemini
    try:
        ai_result = generate_document_analysis(extracted_text)

        summary = ai_result.get("summary")
        risk_level = str(ai_result.get("risk_level", "")).upper()
        risk_reason = ai_result.get("risk_reason")

        if risk_level not in ["LOW", "MEDIUM", "HIGH"]:
            raise ValueError("Invalid risk level returned by Gemini")

        if not all(
            isinstance(value, str) and value.strip()
            for value in [summary, risk_reason]
        ):
            raise ValueError("Gemini returned incomplete analysis")

    except Exception as e:
        print("GEMINI ANALYSIS ERROR:", repr(e))
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI document analysis failed. Please try again.",
            )

    # Save AI analysis in Supabase
    analysis = models.DocumentAnalysis(
        document_id=document.id,
        extracted_text=extracted_text,
        summary=summary,
        risk_level=risk_level,
        risk_reason=risk_reason,
    )

    try:
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save document analysis.",
        )

    return analysis

# =========================================================
# DOWNLOAD DOCUMENT FILE
# =========================================================

@app.get(
    "/documents/{document_id}/download"
)
def download_document(
    document_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    if (
        not document.file_path
        or not os.path.exists(document.file_path)
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )

    return FileResponse(
        path=document.file_path,
        filename=document.file_name,
    )
# =========================================================
# CREATE PAYMENT
# =========================================================

@app.post("/payments", status_code=status.HTTP_201_CREATED)
def create_payment(
    payment: PaymentCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document = (
        db.query(models.Document)
        .filter(
            models.Document.id == payment.document_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )

    new_payment = models.Payment(
        document_id=payment.document_id,
        amount=payment.amount,
        due_date=payment.due_date,
        status=payment.status,
        description=payment.description,
    )

    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)

    return new_payment
# =========================================================
# GET ALL PAYMENTS
# =========================================================

@app.get("/payments")
def get_payments(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    return payments
# =========================================================
# UPDATE PAYMENT
# =========================================================

@app.put("/payments/{payment_id}")
def update_payment(
    payment_id: int,
    payment: PaymentUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_payment = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Payment.id == payment_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if existing_payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    update_data = payment.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            existing_payment,
            field,
            value,
        )

    db.commit()
    db.refresh(existing_payment)

    return existing_payment
# =========================================================
# DELETE PAYMENT
# =========================================================

@app.delete("/payments/{payment_id}")
def delete_payment(
    payment_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_payment = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Payment.id == payment_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if existing_payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    db.delete(existing_payment)
    db.commit()

    return {
        "message": "Payment deleted successfully"
    }
# =========================================================
# GET PAYMENT DEADLINE STATUS
# =========================================================

@app.get("/payments/{payment_id}/status")
def get_payment_status(
    payment_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payment = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Payment.id == payment_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    if payment.status == "PAID":
        return {
            "payment_id": payment.id,
            "due_date": payment.due_date,
            "status": "PAID",
            "days_remaining": None,
        }

    today = datetime.now(timezone.utc).date()

    days_remaining = (
        payment.due_date - today
    ).days

    if days_remaining < 0:
        payment_status = "OVERDUE"

    elif days_remaining <= 7:
        payment_status = "DUE_SOON"

    else:
        payment_status = "PENDING"

    return {
        "payment_id": payment.id,
        "due_date": payment.due_date,
        "status": payment_status,
        "days_remaining": days_remaining,
    }

# =========================================================
# GET PAYMENT STATUS SUMMARY
# =========================================================

@app.get("/payments/status-summary")
def get_payment_status_summary(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    total_payments = len(payments)

    paid = 0
    pending = 0
    due_soon = 0
    overdue = 0

    today = datetime.now(timezone.utc).date()

    for payment in payments:

        if payment.status == "PAID":
            paid += 1
            continue

        days_remaining = (
            payment.due_date - today
        ).days

        if days_remaining < 0:
            overdue += 1

        elif days_remaining <= 7:
            due_soon += 1

        else:
            pending += 1

    return {
        "total_payments": total_payments,
        "paid": paid,
        "pending": pending,
        "due_soon": due_soon,
        "overdue": overdue,
    }
# =========================================================
# GET UPCOMING PAYMENT DEADLINES
# =========================================================

@app.get("/payments/upcoming-deadlines")
def get_upcoming_payment_deadlines(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    today = datetime.now(timezone.utc).date()

    upcoming_payments = []

    for payment in payments:

        if payment.status == "PAID":
            continue

        days_remaining = (
            payment.due_date - today
        ).days

        if 0 <= days_remaining <= 30:

            if days_remaining <= 7:
                priority = "HIGH"

            elif days_remaining <= 15:
                priority = "MEDIUM"

            else:
                priority = "LOW"

            upcoming_payments.append({
                "payment_id": payment.id,
                "document_id": payment.document_id,
                "amount": payment.amount,
                "due_date": payment.due_date,
                "days_remaining": days_remaining,
                "priority": priority,
                "status": payment.status,
                "description": payment.description,
            })

    upcoming_payments.sort(
        key=lambda item: item["days_remaining"]
    )

    return upcoming_payments

# =========================================================
# GET PAYMENT RISK
# =========================================================

@app.get("/payments/{payment_id}/risk")
def get_payment_risk(
    payment_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payment = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Payment.id == payment_id,
            models.Document.user_id == current_user.id,
        )
        .first()
    )

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    if payment.status == "PAID":
        return {
            "payment_id": payment.id,
            "risk": "NONE",
            "reason": "Payment has already been paid",
        }

    today = datetime.now(timezone.utc).date()

    days_remaining = (
        payment.due_date - today
    ).days

    if days_remaining < 0:
        risk = "HIGH"
        reason = "Payment is overdue"

    elif days_remaining <= 7:
        risk = "MEDIUM"
        reason = "Payment is due within 7 days"

    elif days_remaining <= 30:
        risk = "LOW"
        reason = "Payment is due within 30 days"

    else:
        risk = "NONE"
        reason = "Payment is more than 30 days away"

    return {
        "payment_id": payment.id,
        "due_date": payment.due_date,
        "days_remaining": days_remaining,
        "risk": risk,
        "reason": reason,
    }

# =========================================================
# GET PAYMENT RISK SUMMARY
# =========================================================

@app.get("/payments/risk-summary")
def get_payment_risk_summary(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    high = 0
    medium = 0
    low = 0
    none = 0

    today = datetime.now(timezone.utc).date()

    for payment in payments:

        if payment.status == "PAID":
            none += 1
            continue

        days_remaining = (
            payment.due_date - today
        ).days

        if days_remaining < 0:
            high += 1

        elif days_remaining <= 7:
            medium += 1

        elif days_remaining <= 30:
            low += 1

        else:
            none += 1

    return {
        "high_risk": high,
        "medium_risk": medium,
        "low_risk": low,
        "no_risk": none,
    }


# =========================================================
# GET DASHBOARD SUMMARY
# =========================================================

@app.get("/dashboard/summary")
def get_dashboard_summary(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(models.Document.user_id == current_user.id)
        .all()
    )

    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(models.Document.user_id == current_user.id)
        .all()
    )

    today = datetime.now(timezone.utc).date()

    document_summary = {
        "total": len(documents),
        "active": 0,
        "due_soon": 0,
        "expired": 0,
        "no_deadline": 0,
    }

    for document in documents:
        if document.expiry_date is None:
            document_summary["no_deadline"] += 1
        elif document.expiry_date < today:
            document_summary["expired"] += 1
        else:
            document_summary["active"] += 1
            if (document.expiry_date - today).days <= 30:
                document_summary["due_soon"] += 1

    payment_summary = {
        "total": len(payments),
        "paid": 0,
        "pending": 0,
        "due_soon": 0,
        "overdue": 0,
    }

    for payment in payments:
        if payment.status.upper() == "PAID":
            payment_summary["paid"] += 1
        elif payment.due_date < today:
            payment_summary["overdue"] += 1
        else:
            payment_summary["pending"] += 1
            if (payment.due_date - today).days <= 30:
                payment_summary["due_soon"] += 1

    return {
        "documents": document_summary,
        "payments": payment_summary,
    }



# =========================================================
# GET AI DASHBOARD SUMMARY
# =========================================================

@app.get("/dashboard/ai-summary")
def get_ai_dashboard_summary(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    analyses = (
        db.query(models.DocumentAnalysis)
        .join(
            models.Document,
            models.DocumentAnalysis.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    return {
        "total_analyzed": len(analyses),
        "high_risk": sum(
            1 for item in analyses
            if (item.risk_level or "").upper() == "HIGH"
        ),
        "medium_risk": sum(
            1 for item in analyses
            if (item.risk_level or "").upper() == "MEDIUM"
        ),
        "low_risk": sum(
            1 for item in analyses
            if (item.risk_level or "").upper() == "LOW"
        ),
    }



# =========================================================
# GET UPCOMING ALERTS
# =========================================================

@app.get("/alerts/upcoming")
def get_upcoming_alerts(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    today = datetime.now(timezone.utc).date()

    alerts = []

    # -------------------------
    # DOCUMENT ALERTS
    # -------------------------

    for document in documents:

        if document.expiry_date is None:
            continue

        days_remaining = (
            document.expiry_date - today
        ).days

        if 0 <= days_remaining <= 30:

            if days_remaining <= 7:
                priority = "HIGH"
            elif days_remaining <= 15:
                priority = "MEDIUM"
            else:
                priority = "LOW"

            alerts.append({
                "type": "DOCUMENT_EXPIRY",
                "item_id": document.id,
                "title": document.name,
                "date": document.expiry_date,
                "days_remaining": days_remaining,
                "priority": priority,
            })

    # -------------------------
    # PAYMENT ALERTS
    # -------------------------

    for payment in payments:

        if payment.status == "PAID":
            continue

        days_remaining = (
            payment.due_date - today
        ).days

        if 0 <= days_remaining <= 30:

            if days_remaining <= 7:
                priority = "HIGH"
            elif days_remaining <= 15:
                priority = "MEDIUM"
            else:
                priority = "LOW"

            alerts.append({
                "type": "PAYMENT_DUE",
                "item_id": payment.id,
                "title": payment.description or "Payment due",
                "date": payment.due_date,
                "days_remaining": days_remaining,
                "priority": priority,
            })

    # -------------------------
    # SORT ALERTS
    # -------------------------

    alerts.sort(
        key=lambda item: item["days_remaining"]
    )

    return alerts

# =========================================================
# GET OVERDUE ALERTS
# =========================================================

@app.get("/alerts/overdue")
def get_overdue_alerts(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    today = datetime.now(timezone.utc).date()

    alerts = []

    # -------------------------
    # EXPIRED DOCUMENTS
    # -------------------------

    for document in documents:

        if document.expiry_date is None:
            continue

        days_overdue = (
            today - document.expiry_date
        ).days

        if days_overdue > 0:

            alerts.append({
                "type": "DOCUMENT_EXPIRED",
                "item_id": document.id,
                "title": document.name,
                "date": document.expiry_date,
                "days_overdue": days_overdue,
                "priority": "HIGH",
            })

    # -------------------------
    # OVERDUE PAYMENTS
    # -------------------------

    for payment in payments:

        if payment.status == "PAID":
            continue

        days_overdue = (
            today - payment.due_date
        ).days

        if days_overdue > 0:

            alerts.append({
                "type": "PAYMENT_OVERDUE",
                "item_id": payment.id,
                "title": payment.description or "Payment overdue",
                "date": payment.due_date,
                "days_overdue": days_overdue,
                "priority": "HIGH",
            })

    # -------------------------
    # SORT
    # -------------------------

    alerts.sort(
        key=lambda item: item["days_overdue"],
        reverse=True,
    )

    return alerts

# =========================================================
# GET ALL ALERTS
# =========================================================

@app.get("/alerts")
def get_all_alerts(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(models.Document)
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    payments = (
        db.query(models.Payment)
        .join(
            models.Document,
            models.Payment.document_id == models.Document.id,
        )
        .filter(
            models.Document.user_id == current_user.id
        )
        .all()
    )

    today = datetime.now(timezone.utc).date()

    alerts = []

    # -------------------------
    # DOCUMENT ALERTS
    # -------------------------

    for document in documents:

        if document.expiry_date is None:
            continue

        days_remaining = (
            document.expiry_date - today
        ).days

        if days_remaining < 0:

            alerts.append({
                "type": "DOCUMENT_EXPIRED",
                "item_id": document.id,
                "title": document.name,
                "date": document.expiry_date,
                "days": abs(days_remaining),
                "priority": "HIGH",
                "status": "OVERDUE",
            })

        elif days_remaining <= 30:

            if days_remaining <= 7:
                priority = "HIGH"
            elif days_remaining <= 15:
                priority = "MEDIUM"
            else:
                priority = "LOW"

            alerts.append({
                "type": "DOCUMENT_EXPIRY",
                "item_id": document.id,
                "title": document.name,
                "date": document.expiry_date,
                "days": days_remaining,
                "priority": priority,
                "status": "UPCOMING",
            })

    # -------------------------
    # PAYMENT ALERTS
    # -------------------------

    for payment in payments:

        if payment.status == "PAID":
            continue

        days_remaining = (
            payment.due_date - today
        ).days

        if days_remaining < 0:

            alerts.append({
                "type": "PAYMENT_OVERDUE",
                "item_id": payment.id,
                "title": payment.description or "Payment overdue",
                "date": payment.due_date,
                "days": abs(days_remaining),
                "priority": "HIGH",
                "status": "OVERDUE",
            })

        elif days_remaining <= 30:

            if days_remaining <= 7:
                priority = "HIGH"
            elif days_remaining <= 15:
                priority = "MEDIUM"
            else:
                priority = "LOW"

            alerts.append({
                "type": "PAYMENT_DUE",
                "item_id": payment.id,
                "title": payment.description or "Payment due",
                "date": payment.due_date,
                "days": days_remaining,
                "priority": priority,
                "status": "UPCOMING",
            })

    # -------------------------
    # SORT
    # -------------------------

    priority_order = {
        "HIGH": 1,
        "MEDIUM": 2,
        "LOW": 3,
    }

    alerts.sort(
        key=lambda item: (
            priority_order[item["priority"]],
            item["date"],
        )
    )

    return alerts
# =========================================================
# CREATE REMINDER
# =========================================================

@app.post("/reminders", status_code=status.HTTP_201_CREATED)
def create_reminder(
    reminder: ReminderCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # A reminder must belong to a document or payment

    if (
        reminder.document_id is None
        and reminder.payment_id is None
       ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reminder must belong to a document or payment",
         )

    if (
        reminder.document_id is not None
        and reminder.payment_id is not None
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reminder can belong to either a document or payment, not both",
            )

    # Check document ownership

    if reminder.document_id is not None:

        document = (
            db.query(models.Document)
            .filter(
                models.Document.id == reminder.document_id,
                models.Document.user_id == current_user.id,
            )
            .first()
        )

        if document is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Document not found",
            )

    # Check payment ownership

    if reminder.payment_id is not None:

        payment = (
            db.query(models.Payment)
            .join(
                models.Document,
                models.Payment.document_id == models.Document.id,
            )
            .filter(
                models.Payment.id == reminder.payment_id,
                models.Document.user_id == current_user.id,
            )
            .first()
        )

        if payment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found",
            )

    new_reminder = models.Reminder(
        user_id=current_user.id,
        document_id=reminder.document_id,
        payment_id=reminder.payment_id,
        reminder_date=reminder.reminder_date,
        message=reminder.message,
        status="PENDING",
    )

    db.add(new_reminder)
    db.commit()
    db.refresh(new_reminder)

    return new_reminder

# =========================================================
# GET REMINDERS
# =========================================================

@app.get("/reminders")
def get_reminders(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    reminders = (
        db.query(models.Reminder)
        .filter(
            models.Reminder.user_id == current_user.id
        )
        .order_by(
            models.Reminder.reminder_date
        )
        .all()
    )

    return reminders
# =========================================================
# UPDATE REMINDER
# =========================================================

@app.put("/reminders/{reminder_id}")
def update_reminder(
    reminder_id: int,
    reminder: ReminderUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_reminder = (
        db.query(models.Reminder)
        .filter(
            models.Reminder.id == reminder_id,
            models.Reminder.user_id == current_user.id,
        )
        .first()
    )

    if existing_reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found",
        )
    if (
    reminder.status is not None
    and reminder.status not in {
        "PENDING",
        "SENT",
        "COMPLETED",
        "CANCELLED",
        }
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid reminder status",
        )
    update_data = reminder.model_dump(
        exclude_unset=True
    )
    
    for field, value in update_data.items():
        setattr(
            existing_reminder,
            field,
            value,
        )

    db.commit()
    db.refresh(existing_reminder)

    return existing_reminder
# =========================================================
# DELETE REMINDER
# =========================================================

@app.delete("/reminders/{reminder_id}")
def delete_reminder(
    reminder_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_reminder = (
        db.query(models.Reminder)
        .filter(
            models.Reminder.id == reminder_id,
            models.Reminder.user_id == current_user.id,
        )
        .first()
    )

    if existing_reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found",
        )

    db.delete(existing_reminder)
    db.commit()

    return {
        "message": "Reminder deleted successfully"
    }