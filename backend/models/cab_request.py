from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date, datetime, time

class CabRequest(BaseModel):
    employee_id: str
    employee_name: str
    project_id: str
    mobile_number: str
    email: EmailStr
    pickup_location: str
    drop_location: str
    pickup_date: date
    pickup_time: str 
    number_of_passengers: int
    cab_type: str # Sedan, SUV, etc.
    manager_approval: Optional[str] = None
    special_requests: Optional[str] = None
    booking_confirmation_number: Optional[str] = None
    confirmation_email: Optional[EmailStr] = None
