from fastapi import APIRouter, HTTPException, Depends
from pymongo import MongoClient
from models.flight_request import FlightRequest
from config import get_db

router = APIRouter()

@router.get("/flight_requests")
async def get_flight_requests(db=Depends(get_db)):
    try:
        flight_requests = list(db["flight_requests"].find({}, {"_id": 0}))
        return flight_requests
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/flight_requests/{employee_id}")
async def get_flight_request_by_id(employee_id: str, db=Depends(get_db)):
    try:
        flight_request = db["flight_requests"].find_one({"employee_id": employee_id}, {"_id": 0})
        if not flight_request:
            raise HTTPException(status_code=404, detail="Flight request not found")
        
        # Convert null values to empty strings for optional fields
        optional_fields = ['return_date', 'airline_preference', 'meal_preference',
                          'manager_approval', 'special_requests', 
                          'booking_confirmation_number', 'confirmation_email']
        for field in optional_fields:
            if field in flight_request and flight_request[field] is None:
                flight_request[field] = ""
        
        return flight_request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/flight_requests")
async def add_flight_request(request: FlightRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        if data["departure_date"]:
            data["departure_date"] = data["departure_date"].isoformat()
        if data["return_date"]:
            data["return_date"] = data["return_date"].isoformat()
        
        result = db["flight_requests"].insert_one(data)
        return {"message": "Flight request added", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/flight_requests/{employee_id}")
async def update_flight_request(employee_id: str, request: FlightRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        
        # Convert empty strings to None for optional fields
        optional_fields = ['return_date', 'airline_preference', 'meal_preference',
                          'manager_approval', 'special_requests', 
                          'booking_confirmation_number', 'confirmation_email']
        for field in optional_fields:
            if field in data and data[field] == "":
                data[field] = None
        
        # Handle date fields
        if data["departure_date"]:
            data["departure_date"] = data["departure_date"].isoformat()
        if data["return_date"]:
            data["return_date"] = data["return_date"].isoformat()
            
        result = db["flight_requests"].update_one(
            {"employee_id": employee_id},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Flight request not found")
        
        return {"message": "Flight request updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/flight_requests/{employee_id}")
async def delete_flight_request(employee_id: str, db=Depends(get_db)):
    try:
        result = db["flight_requests"].delete_one({"employee_id": employee_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Flight request not found")
        
        return {"message": "Flight request deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
