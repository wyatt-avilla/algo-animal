import os
from flask import Flask, jsonify as flask_jsonify, request as flask_request
from flask_pymongo import PyMongo
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

flask_app = Flask(__name__)
flask_app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/tamagotchi")
flask_mongo = PyMongo(flask_app)

@flask_app.route("/")
def flask_home():
    return flask_jsonify({"framework": "flask", "message": "Backend is running!"})

@flask_app.route("/tamagotchi", methods=["POST"])
def flask_create_tamagotchi():
    data = flask_request.json
    flask_mongo.db.pets.insert_one(data)
    return flask_jsonify({"message": "Tamagotchi created"}), 201

@flask_app.route("/tamagotchi", methods=["GET"])
def flask_list_tamagotchis():
    pets = list(flask_mongo.db.pets.find({}, {"_id": 0}))
    return flask_jsonify(pets)

fastapi_app = FastAPI()
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
fastapi_db = client.tamagotchi

@fastapi_app.get("/")
async def fastapi_home():
    return {"framework": "fastapi", "message": "Backend is running!"}

@fastapi_app.get("/tamagotchi")
async def fastapi_list_tamagotchis():
    pets = list(fastapi_db.pets.find({}, {"_id": 0}))
    return pets

@fastapi_app.post("/tamagotchi")
async def fastapi_create_tamagotchi(request: Request):
    data = await request.json()
    fastapi_db.pets.insert_one(data)
    return JSONResponse(status_code=201, content={"message": "Tamagotchi created"})

# =============================
# Entry Points
# =============================
if __name__ == "__main__":
    import sys
    mode = sys.argv[1] if len(sys.argv) > 1 else "flask"
    
    if mode == "fastapi":
        import uvicorn
        uvicorn.run("app:fastapi_app", host="0.0.0.0", port=8080, reload=True)
    else:
        flask_app.run(host="0.0.0.0", port=8080, debug=True)
