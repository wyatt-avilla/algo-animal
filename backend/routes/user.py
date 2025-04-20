from fastapi import APIRouter, Depends, Request, HTTPException
# from pymongo.collection import Collection
# from jose import jwt
# from urllib.request import urlopen
# import json
# from datetime import datetime
# import os
# from backend.loadenv import load_environment_variables

# env = load_environment_variables()

router = APIRouter()

# AUTH0_DOMAIN = env["AUTH0_DOMAIN"]
# API_IDENTIFIER = env["API_IDENTIFIER"]
# ALGORITHMS = env["ALGORITHMS"]


# def get_jwks():
#     jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
#     with urlopen(jwks_url) as response:
#         return json.load(response)


# def verify_jwt_token(token: str):
#     jwks = get_jwks()
#     unverified_header = jwt.get_unverified_header(token)

#     rsa_key = {}
#     for key in jwks["keys"]:
#         if key["kid"] == unverified_header["kid"]:
#             rsa_key = {
#                 "kty": key["kty"],
#                 "kid": key["kid"],
#                 "use": key["use"],
#                 "n": key["n"],
#                 "e": key["e"],
#             }

#     if not rsa_key:
#         raise HTTPException(status_code=401, detail="RSA key not found.")

#     try:
#         payload = jwt.decode(
#             token,
#             rsa_key,
#             algorithms=ALGORITHMS,
#             audience=API_AUDIENCE,
#             issuer=f"https://{AUTH0_DOMAIN}/",
#         )
#         return payload
#     except jwt.ExpiredSignatureError:
#         raise HTTPException(status_code=401, detail="Token expired.")
#     except jwt.JWTClaimsError:
#         raise HTTPException(status_code=401, detail="Incorrect claims.")
#     except Exception:
#         raise HTTPException(status_code=401, detail="Unable to parse token.")


# async def get_current_user(request: Request):
#     auth_header = request.headers.get("Authorization")
#     if not auth_header:
#         raise HTTPException(status_code=401, detail="Missing Authorization header.")

#     token = auth_header.replace("Bearer ", "")
#     return verify_jwt_token(token)


# @router.post("/api/onboard")
# async def onboard_user(user_info=Depends(get_current_user)):
#     auth0_id = user_info["sub"]
#     email = user_info.get("email")

#     user = users_collection.find_one({"auth0_id": auth0_id})

#     if user:
#         return user

#     new_user = {
#         "auth0_id": auth0_id,
#         "email": email,
#         "points": 0,
#         "koala": False,
#         "cat": False,
#         "food": 0,
#         "petStatus": 5,
#         "petBirth": datetime.utcnow(),
#         "lastFed": datetime.utcnow(),
#     }

#     users_collection.insert_one(new_user)
#     return new_user["auth0_id"]
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import requests
from backend.loadenv import load_environment_variables
from pymongo.collection import Collection
from urllib.request import urlopen
import json
from datetime import datetime
import os
from backend.db import users_collection

app = FastAPI()
env = load_environment_variables()

AUTH0_DOMAIN = env["AUTH0_DOMAIN"]
API_AUDIENCE = env["API_IDENTIFIER"]
ALGORITHMS = env["ALGORITHMS"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_jwks():
    url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    return requests.get(url).json()["keys"]

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        header = jwt.get_unverified_header(token)
        jwks = get_jwks()
        key = next((k for k in jwks if k["kid"] == header["kid"]), None)
        if key is None:
            raise Exception("Public key not found.")

        payload = jwt.decode(
            token,
            key=jwt.algorithms.RSAAlgorithm.from_jwk(key),
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/",
            algorithms=ALGORITHMS,
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@app.get("/api/private")
def private_route(payload: dict = Depends(verify_token)):
    return {"message": "Success! You're authenticated.", "user": payload["sub"]}

@app.get("/api/user")
def get_user_info(payload: dict = Depends(verify_token)):
    auth0_id = payload["sub"]
    user = users_collection.find_one({"auth0_id": auth0_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/api/onboard")
def onboard_user(payload: dict = Depends(verify_token)):
    auth0_id = payload["sub"]
    email = payload.get("email")

    user = users_collection.find_one({"auth0_id": auth0_id})

    if user:
        return user

    new_user = {
        "auth0_id": auth0_id,
        "email": email,
        "points": 0,
        "koala": False,
        "cat": False,
        "food": 0,
        "petStatus": 5,
        "petBirth": datetime.utcnow(),
        "lastFed": datetime.utcnow(),
    }

    users_collection.insert_one(new_user)
    return new_user["auth0_id"]