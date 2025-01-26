from fastapi import APIRouter, File, UploadFile, Form
import os
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/")
async def upload_audio(user_id: str = Form(...), doc_id: str = Form(...), file: UploadFile = File(...)):
    try:
        print("Uploading audio file...")
        print(f"User ID: {user_id}")
        print(f"Doc ID: {doc_id}")
        print(f"File Name: {file.filename}")
        
        DATA_FOLDER = "data"
        if not os.path.exists(DATA_FOLDER):
            os.makedirs(DATA_FOLDER)

        # Save the uploaded file
        file_path = os.path.join(DATA_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        return JSONResponse({
            "message": "File uploaded successfully",
            "file_path": file_path,
            "user_id": user_id,
            "doc_id": doc_id,
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
