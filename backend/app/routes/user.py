from fastapi import APIRouter, HTTPException
from app.database import user_collection

router = APIRouter()

@router.get("/doctors", response_model=list)
async def get_all_doctors():
    """
    Fetch all users with the role of 'doctor'.
    """
    try:
        doctors = list(user_collection.find({"role": "doctor"}, {"_id": 1, "username": 1, "email": 1}))
        # Convert ObjectId to string for '_id'
        for doctor in doctors:
            doctor["_id"] = str(doctor["_id"])
        return doctors
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
