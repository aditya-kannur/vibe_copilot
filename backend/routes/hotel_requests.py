from fastapi import APIRouter, HTTPException, Depends
from pymongo import MongoClient
from models.hotel_request import HotelRequest
from config import get_db

router = APIRouter()

@router.get("/hotel_requests")
async def get_hotel_requests(db=Depends(get_db)):
    try:
        hotel_requests = list(db["hotel_requests"].find({}, {"_id": 0}))
        return hotel_requests
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/hotel_requests/{employee_id}")
async def get_hotel_request_by_id(employee_id: str, db=Depends(get_db)):
    try:
        hotel_request = db["hotel_requests"].find_one({"employee_id": employee_id}, {"_id": 0})
        if not hotel_request:
            raise HTTPException(status_code=404, detail="Hotel request not found")
        
        # Convert null values to empty strings for optional fields
        optional_fields = ['booking_confirmation_number', 'manager_approval', 
                          'special_requests', 'hotel_preferences', 'confirmation_email']
        for field in optional_fields:
            if field in hotel_request and hotel_request[field] is None:
                hotel_request[field] = ""
        
        return hotel_request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/hotel_requests")
async def add_hotel_request(request: HotelRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        if data["check_in"]:
            data["check_in"] = data["check_in"].isoformat()
        if data["check_out"]:
            data["check_out"] = data["check_out"].isoformat()
        
        result = db["hotel_requests"].insert_one(data)
        return {"message": "Hotel request added", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/hotel_requests/{employee_id}")
async def update_hotel_request(employee_id: str, request: HotelRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        
        # Convert empty strings to None for optional fields
        optional_fields = ['booking_confirmation_number', 'manager_approval', 
                         'special_requests', 'hotel_preferences', 'confirmation_email']
        for field in optional_fields:
            if field in data and data[field] == "":
                data[field] = None
        
        # Handle date fields
        if data["check_in"]:
            data["check_in"] = data["check_in"].isoformat()
        if data["check_out"]:
            data["check_out"] = data["check_out"].isoformat()
        
        result = db["hotel_requests"].update_one(
            {"employee_id": employee_id},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Hotel request not found")
        
        return {"message": "Hotel request updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/hotel_requests/{employee_id}")
async def delete_hotel_request(employee_id: str, db=Depends(get_db)):
    try:
        result = db["hotel_requests"].delete_one({"employee_id": employee_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Hotel request not found")
        
        return {"message": "Hotel request deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
