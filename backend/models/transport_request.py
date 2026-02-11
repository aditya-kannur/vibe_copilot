from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date

class TransportRequest(BaseModel):
    employee_id: str
    employee_name: str
    project_id: str
    mobile_number: str
    email: EmailStr
    transport_type: str # Train, Bus, etc.
    from_location: str
    to_location: str
    travel_date: date
    return_date: Optional[date] = None
    preferred_time: Optional[str] = None
    manager_approval: Optional[str] = None
    special_requests: Optional[str] = None
    booking_confirmation_number: Optional[str] = None
    confirmation_email: Optional[EmailStr] = None
