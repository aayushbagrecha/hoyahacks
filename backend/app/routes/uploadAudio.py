from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import os
router = APIRouter()

@router.post("/")
async def upload_audio(file: UploadFile = File(...)):
    try:
        print("uploading audio")
        DATA_FOLDER = "data"
        if not os.path.exists(DATA_FOLDER):
            os.makedirs(DATA_FOLDER)
        # Save the uploaded file to the "data" folder
        file_path = os.path.join(DATA_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        return JSONResponse({"message": "File uploaded successfully", "file_path": file_path})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)