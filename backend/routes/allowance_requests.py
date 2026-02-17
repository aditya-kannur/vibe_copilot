from fastapi import APIRouter, HTTPException, Depends
from pymongo import MongoClient
from models.allowance_request import AllowanceRequest
from config import get_db

router = APIRouter()

@router.get("/allowance_requests")
async def get_allowance_requests(db=Depends(get_db)):
    try:
        allowance_requests = list(db["allowance_requests"].find({}, {"_id": 0}))
        return allowance_requests
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/allowance_requests/{employee_id}")
async def get_allowance_request_by_id(employee_id: str, db=Depends(get_db)):
    try:
        allowance_request = db["allowance_requests"].find_one({"employee_id": employee_id}, {"_id": 0})
        if not allowance_request:
            raise HTTPException(status_code=404, detail="Allowance request not found")
        
        # Convert null values to empty strings for optional fields
        optional_fields = ['manager_approval', 'receipt_url', 'payment_status', 'remarks']
        for field in optional_fields:
            if field in allowance_request and allowance_request[field] is None:
                allowance_request[field] = ""
        
        return allowance_request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/allowance_requests")
async def add_allowance_request(request: AllowanceRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        if data["request_date"]:
            data["request_date"] = data["request_date"].isoformat()
        
        result = db["allowance_requests"].insert_one(data)
        return {"message": "Allowance request added", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/allowance_requests/{employee_id}")
async def update_allowance_request(employee_id: str, request: AllowanceRequest, db=Depends(get_db)):
    try:
        data = request.dict()
        
        # Convert empty strings to None for optional fields
        optional_fields = ['manager_approval', 'receipt_url', 'payment_status', 'remarks']
        for field in optional_fields:
            if field in data and data[field] == "":
                data[field] = None
        
        if data["request_date"]:
            data["request_date"] = data["request_date"].isoformat()
            
        result = db["allowance_requests"].update_one(
            {"employee_id": employee_id},
            {"$set": data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Allowance request not found")
        
        return {"message": "Allowance request updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/allowance_requests/{employee_id}")
async def delete_allowance_request(employee_id: str, db=Depends(get_db)):
    try:
        result = db["allowance_requests"].delete_one({"employee_id": employee_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Allowance request not found")
        
        return {"message": "Allowance request deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
