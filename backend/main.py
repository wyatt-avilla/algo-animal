from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Enable CORS for local dev or client access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def hello():
    return {"message": "Hello from FastAPI (autobuild test)"}


# Serve built React files
app.mount("/", StaticFiles(directory="static", html=True), name="static")


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    return FileResponse(os.path.join("static", "index.html"))
