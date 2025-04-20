import os
from pymongo import MongoClient
from dotenv import load_dotenv
from backend.dbclasses import User
from pathlib import Path
from backend.loadenv import load_environment_variables

env = load_environment_variables()

client = MongoClient(env["MONGO_URI"])
db = client[env["MONGO_DB"]]
users_collection = db["users"]

def get_user_by_auth0(auth0_id):
    user = users_collection.find_one({"auth0_id": auth0_id})
    if user:
        return User(
            points=user["points"],
            auth0_id=user["auth0_id"],
            koala=user.get("koala"),
            cat=user.get("cat"),
            food=user.get("food"),
        )
    return None

def upload_user(user):
    user = {
        "username": user.username,
        "password": user.password,
        "points": user.points,
        "auth0_id": user.auth0_id
    }
    if users_collection.find_one({"auth0_id": user["auth0_id"]}):
        return False
    else:
        users_collection.insert_one(user)
        return True

def get_uncompleted_problem():
    uncompleted = list(users_collection.find({"completed": False}))
    if uncompleted:
        return random.choice(uncompleted)
    return None

def feed_pet(pet_id):
    pet = users_collection.find_one({"petID": pet_id})
    if pet:
        pet["lastFed"] = datetime.utcnow()
        users_collection.update_one({"petID": pet_id}, {"$set": pet})
        return True
    return False