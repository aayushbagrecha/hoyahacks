from passlib.context import CryptContext
from app.database import user_collection, consultations_collection

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_username(username: str):
    return user_collection.find_one({"username": username})

def create_user(data: dict):
    user_collection.insert_one(data)

def getUser_summaries(username: str):
    print(username)
    query = {"patientId": username}
    projection = {"summary": 1}
    results = list(consultations_collection.find(query, projection))
    return {"summaries": results}

def insert_patient_consultation(data: dict):
    result = consultations_collection.insert_one(data)
    return result
