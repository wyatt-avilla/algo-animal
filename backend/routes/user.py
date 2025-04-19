from fastapi import APIRouter
from pydantic import BaseModel
from db import db
from bson import ObjectId

router = APIRouter()

# Pydantic model for request body
class CreateUserRequest(BaseModel):
    username: str
    email: str

@router.post("/user/create")
def create_user(user: CreateUserRequest):
    user_data = {
        "username": user.username,
        "pass": user.email,
        "points": 0,
        "pet_alive": True
    }
    result = db.users.insert_one(user_data)
    return {"id": str(result.inserted_id), "user": user_data}
