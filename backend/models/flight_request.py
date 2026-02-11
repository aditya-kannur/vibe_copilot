from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date, datetime

class FlightRequest(BaseModel):
    employee_id: str
    employee_name: str
    project_id: str
    mobile_number: str
    email: EmailStr
    from_city: str
    to_city: str
    departure_date: date
    return_date: Optional[date] = None
    airline_preference: Optional[str] = None
    travel_class: str 
    meal_preference: Optional[str] = None
    manager_approval: Optional[str] = None
    special_requests: Optional[str] = None
    booking_confirmation_number: Optional[str] = None
    confirmation_email: Optional[EmailStr] = None
