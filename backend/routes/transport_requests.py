from fastapi import APIRouter, HTTPException, Depends
from pymongo import MongoClient
from models.transport_request import TransportRequest
from config import get_db

router = APIRouter()

@router.get("/transport_requests")
async def get_transport_requests(db=Depends(get_db)):
    try:
        transport_requests = list(db["transport_requests"].find({}, {"_id": 0}))
        return transport_requests
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/transport_requests/{employee_id}")
async def get_transport_request_by_id(employee_id: str, db=Depends(get_db)):
    try:
        transport_request = db["transport_requests"].find_one({"employee_id": employee_id}, {"_id": 0})
        if not transport_request:
            raise HTTPException(status_code=404, detail="Transport request not found")
        
        # Convert null values to empty strings for optional fields
        optional_fields = ['return_date', 'preferred_time', 'manager_approval', 
                          'special_requests', 'booking_confirmation_number', 'confirmation_email']
        for field in optional_fields:
            if field in transport_request and transport_request[field] is None:
                transport_request[field] = ""
        
        return transport_request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/transport_requests")
async def add_transport_request(request: TransportRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        if data["travel_date"]:
            data["travel_date"] = data["travel_date"].isoformat()
        if data["return_date"]:
            data["return_date"] = data["return_date"].isoformat()
        
        result = db["transport_requests"].insert_one(data)
        return {"message": "Transport request added", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/transport_requests/{employee_id}")
async def update_transport_request(employee_id: str, request: TransportRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        
        # Convert empty strings to None for optional fields
        optional_fields = ['return_date', 'preferred_time', 'manager_approval', 
                          'special_requests', 'booking_confirmation_number', 'confirmation_email']
        for field in optional_fields:
            if field in data and data[field] == "":
                data[field] = None
        
        if data["travel_date"]:
            data["travel_date"] = data["travel_date"].isoformat()
        if data["return_date"]:
            data["return_date"] = data["return_date"].isoformat()
            
        result = db["transport_requests"].update_one(
            {"employee_id": employee_id},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Transport request not found")
        
        return {"message": "Transport request updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/transport_requests/{employee_id}")
async def delete_transport_request(employee_id: str, db=Depends(get_db)):
    try:
        result = db["transport_requests"].delete_one({"employee_id": employee_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Transport request not found")
        
        return {"message": "Transport request deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
