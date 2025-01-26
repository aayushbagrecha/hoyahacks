from fastapi import APIRouter, HTTPException, Query
from app.database import user_collection
from bson import ObjectId

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
    
@router.get("/doctor")
async def get_doctor_by_id(doctorId: str = Query(..., description="The ID of the doctor")):
    """
    Fetch doctor details by doctorId.
    """
    try:
        # Convert doctorId to ObjectId
        object_id = ObjectId(doctorId)

        # Query the database to find the doctor by ID
        doctor = user_collection.find_one({"_id": object_id, "role": "doctor"}, {"_id": 1, "username": 1, "email": 1})
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor not found")

        # Convert MongoDB ObjectId to string
        doctor["_id"] = str(doctor["_id"])
        return doctor
    except Exception as e:
        # Check if the error is due to invalid ObjectId format
        if isinstance(e, (TypeError, ValueError)):
            raise HTTPException(status_code=400, detail="Invalid doctorId format")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/patients", response_model=list)
async def get_all_patients():
    """
    Fetch all users with the role of 'patient'.
    """
    try:
        patients = list(user_collection.find({"role": "patient"}, {"_id": 1, "username": 1, "email": 1}))
        # Convert ObjectId to string for '_id'
        for patient in patients:
            patient["_id"] = str(patient["_id"])
        return patients
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")