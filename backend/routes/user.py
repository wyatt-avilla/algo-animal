from fastapi import APIRouter, Depends, Request, HTTPException
from pymongo.collection import Collection
from jose import jwt
from urllib.request import urlopen
import json
from datetime import datetime
import os

# MongoDB collection import
# from db import users_collection

router = APIRouter()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN", "your-auth0-domain")
API_IDENTIFIER = os.getenv("API_AUDIENCE", "your-api-identifier")
ALGORITHMS = ["RS256"]

print("AUTH0_DOMAIN:", AUTH0_DOMAIN)

def get_jwks():
    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    with urlopen(jwks_url) as response:
        return json.load(response)


def verify_jwt_token(token: str):
    jwks = get_jwks()
    unverified_header = jwt.get_unverified_header(token)

    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }

    if not rsa_key:
        raise HTTPException(status_code=401, detail="RSA key not found.")

    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired.")
    except jwt.JWTClaimsError:
        raise HTTPException(status_code=401, detail="Incorrect claims.")
    except Exception:
        raise HTTPException(status_code=401, detail="Unable to parse token.")


async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization header.")

    token = auth_header.replace("Bearer ", "")
    return verify_jwt_token(token)


@router.post("/api/onboard")
async def onboard_user(user_info=Depends(get_current_user)):
    auth0_id = user_info["sub"]
    email = user_info.get("email")

    user = users_collection.find_one({"auth0_id": auth0_id})

    if user:
        return user

    new_user = {
        "auth0_id": auth0_id,
        "email": email,
        "points": 0,
        "pet": "tamagotchi",
        "created_at": datetime.utcnow(),
    }

    users_collection.insert_one(new_user)
    return new_user
