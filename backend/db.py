import os
from pymongo import MongoClient
from dotenv import load_dotenv
from dbclasses import User
from pathlib import Path


# MONGO_URI = os.getenv("MONGO_URI")
# MONGO_DB = os.getenv("MONGO_DB")
# print("Mongo URI:", MONGO_URI)
# print("Mongo DB:", MONGO_DB)

# client = MongoClient(MONGO_URI)
# db = client[MONGO_DB]
# users_collection = db["users"]


def test_insert_user():
    test_user = {
        "username": "testuser123",
        "password": "123",
        "points": 50
    }

    # Clean up before inserting to avoid duplicates
    users_collection.delete_many({"username": test_user["username"]})

    # Insert the user
    result = users_collection.insert_one(test_user)
    assert result.inserted_id is not None

    # Retrieve the user to confirm it was inserted
    inserted_user = users_collection.find_one({"username": test_user["username"]})
    assert inserted_user is not None
    assert inserted_user["password"] == test_user["password"]
    assert inserted_user["points"] == test_user["points"]

    print("✅ Test passed: User successfully inserted and verified.")


# if __name__ == "__main__":
#     # Test the connection
#     test_insert_user()
#     try:
#         client.admin.command('ping')
#         print("MongoDB connection successful")
#     except Exception as e:
#         print(f"MongoDB connection failed: {e}")