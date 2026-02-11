from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date

class AllowanceRequest(BaseModel):
    employee_id: str
    employee_name: str
    project_id: str
    mobile_number: str
    email: EmailStr
    amount: float
    currency: str
    purpose: str
    request_date: date
    manager_approval: Optional[str] = None
    receipt_url: Optional[str] = None
    payment_status: Optional[str] = None # Pending, Paid
    remarks: Optional[str] = None
