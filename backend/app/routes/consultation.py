from fastapi import APIRouter, HTTPException, Depends, Query
from bson import ObjectId
from typing import List
from app.database import consultations_collection
from typing import List, Optional

router = APIRouter()

# Utility function to convert ObjectId to string
def consultation_serializer(consultation):
    consultation["_id"] = str(consultation["_id"])  # Convert ObjectId to string
    return consultation

@router.get("", response_model=List[dict])
async def get_all_consultations():
    """
    Fetch all consultations from the database.
    """
    try:
        consultations = list(consultations_collection.find())
        consultations = [consultation_serializer(consult) for consult in consultations]
        return consultations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.get("/filtered-consultations", response_model=List[dict])
async def get_consultations(patientId: Optional[str] = Query(None, alias="patientId")):
    """
    Fetch all consultations for a given patientId.
    """
    try:
        # If no patientId is provided, return an empty list
        if not patientId:
            return []
        
        # Fetch consultations from the database
        consultations = list(consultations_collection.find({"patientId": patientId}))
        
        # Convert ObjectId to string and sanitize the response
        for consultation in consultations:
            consultation["_id"] = str(consultation["_id"])
            consultation["patientId"] = str(consultation["patientId"])
            consultation["doctorId"] = str(consultation["doctorId"])

        return consultations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")