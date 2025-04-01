from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date

class HotelRequest(BaseModel):
    employee_id: str
    employee_name: str
    destination: str
    check_in: Optional[date] = None
    check_out: Optional[date] = None
    number_of_rooms: int
    room_type: str
    booking_status: str = "Pending"
    manager_approval: Optional[str] = None
    special_requests: Optional[str] = None
    hotel_preferences: Optional[str] = None
    booking_confirmation_number: Optional[str] = None
    email: EmailStr 
    confirmation_email: Optional[EmailStr] = None 
