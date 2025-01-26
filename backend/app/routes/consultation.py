from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from typing import List
from app.database import consultations_collection

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