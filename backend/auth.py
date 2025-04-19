from jose import jwt
from jose.exceptions import JWTError
from functools import wraps
from flask import request, jsonify
from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer
import os
import requests

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_IDENTIFIER = os.getenv("API_IDENTIFIER")
ALGORITHMS = [os.getenv("ALGORITHMS", "RS256")]

# Caches JWKS
jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
jwks = requests.get(jwks_url).json()

def verify_token(token):
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_IDENTIFIER,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
            return payload
        except JWTError as e:
            raise Exception(f"Token decode error: {e}")
    raise Exception("Unable to find appropriate key")

# Flask decorator
def requires_auth_flask(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth = request.headers.get("Authorization", None)
        if auth:
            parts = auth.split()
            if parts[0].lower() == "bearer" and len(parts) == 2:
                token = parts[1]
        if not token:
            return jsonify({"message": "Missing token"}), 401
        try:
            payload = verify_token(token)
        except Exception as e:
            return jsonify({"message": str(e)}), 401
        return f(*args, **kwargs)
    return decorated

# FastAPI dependency
class Auth0Bearer(HTTPBearer):
    async def __call__(self, request: Request):
        credentials = await super().__call__(request)
        try:
            return verify_token(credentials.credentials)
        except Exception as e:
            raise HTTPException(status_code=401, detail=str(e))

auth0_scheme = Auth0Bearer()
