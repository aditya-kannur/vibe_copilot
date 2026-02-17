from fastapi import APIRouter, HTTPException, Depends
from pymongo import MongoClient
from models.cab_request import CabRequest
from config import get_db

router = APIRouter()

@router.get("/cab_requests")
async def get_cab_requests(db=Depends(get_db)):
    try:
        cab_requests = list(db["cab_requests"].find({}, {"_id": 0}))
        return cab_requests
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cab_requests/{employee_id}")
async def get_cab_request_by_id(employee_id: str, db=Depends(get_db)):
    try:
        cab_request = db["cab_requests"].find_one({"employee_id": employee_id}, {"_id": 0})
        if not cab_request:
            raise HTTPException(status_code=404, detail="Cab request not found")
        
        # Convert null values to empty strings for optional fields
        optional_fields = ['manager_approval', 'special_requests', 
                          'booking_confirmation_number', 'confirmation_email']
        for field in optional_fields:
            if field in cab_request and cab_request[field] is None:
                cab_request[field] = ""
        
        return cab_request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/cab_requests")
async def add_cab_request(request: CabRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        if data["pickup_date"]:
            data["pickup_date"] = data["pickup_date"].isoformat()
        
        result = db["cab_requests"].insert_one(data)
        return {"message": "Cab request added", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/cab_requests/{employee_id}")
async def update_cab_request(employee_id: str, request: CabRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        
        # Convert empty strings to None for optional fields
        optional_fields = ['manager_approval', 'special_requests', 
                          'booking_confirmation_number', 'confirmation_email']
        for field in optional_fields:
            if field in data and data[field] == "":
                data[field] = None
        
        if data["pickup_date"]:
            data["pickup_date"] = data["pickup_date"].isoformat()
            
        result = db["cab_requests"].update_one(
            {"employee_id": employee_id},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Cab request not found")
        
        return {"message": "Cab request updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/cab_requests/{employee_id}")
async def delete_cab_request(employee_id: str, db=Depends(get_db)):
    try:
        result = db["cab_requests"].delete_one({"employee_id": employee_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Cab request not found")
        
        return {"message": "Cab request deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
