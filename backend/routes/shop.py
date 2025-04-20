from fastapi import APIRouter, Depends, Request, HTTPException
from pymongo.collection import Collection
from jose import jwt
from urllib.request import urlopen
import json
from datetime import datetime
import os
from backend.loadenv import load_environment_variables

shop = {
    "koala": {
        "name": "koala",
        "price": 175,
        "description": "A second pet",
        "image": "/assets/shop/sprite2.png"
    },
    "cat": {
        "name": "cat",
        "price": 200,
        "description": "A third pet",
        "image": "/assets/shop/sprite3.png"
    },
    "food": {
        "name": "food",
        "price": 20,
        "description": "Food for your pet",
        "image": "/assets/shop/sprite4.png"
    },
}

env = load_environment_variables()
client = MongoClient(env["MONGO_URI"])
db = client[env["MONGO_DB"]]
users_collection = db["users"]

router = APIRouter(prefix="/shop")

@router.post("/buy")
def buy_item(user_id: str, item_name: str):
    if not user_id or not item_name:
        raise HTTPException(status_code=400, detail="User ID and item name are required.")
    item = shop.get(item_name)
    points = users_collection.find_one({"_id": user_id})["points"]
    update = {
        "$set": {
            "points": points - item["price"]
        }
    }
    if item_name in ["koala", "cat"]:
        update["$set"][""] = item_name
    



