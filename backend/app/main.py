from fastapi import FastAPI
from app.routes import auth, profile

app = FastAPI()

# Include routes
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/profile", tags=["Profile"])

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Auth System!"}
