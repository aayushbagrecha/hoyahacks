from fastapi import FastAPI
from app.routes import auth, profile, uploadAudio, chatBot, user, consultation
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routes
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/profile", tags=["Profile"])
app.include_router(uploadAudio.router, prefix="/upload-audio", tags=["UploadAudio"])
app.include_router(chatBot.router, prefix="/chatBot", tags=["chatBot"])
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(consultation.router, prefix="/consultations", tags=["consultations"])

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Auth System!"}
