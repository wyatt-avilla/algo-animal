from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from backend.routes.user import router as users_router
from dotenv import load_dotenv
from pymongo import MongoClient
from backend.loadenv import load_environment_variables
from backend.question_grading import router as question_grading_router


app = FastAPI()

env = load_environment_variables()

MONGO_URI = env["MONGO_URI"]
MONGO_DB = env["MONGO_DB"]

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
users_collection = db["users"]

app.include_router(users_router)

# Enable CORS for local dev or client access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(question_grading_router)


@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI (test test)"}


# Serve built React files
app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")
app.mount("/", StaticFiles(directory="static", html=True), name="static")


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(os.path.join("static", "index.html"))
