from pydantic import BaseModel

# Request schemas
class UserCreate(BaseModel):
    username: str
    email: str
    role: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Response schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_id: str

class ChatBotMessage(BaseModel):
    sender: str
    text: str
    user_id: str
