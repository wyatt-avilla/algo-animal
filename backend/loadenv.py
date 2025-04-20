from dotenv import load_dotenv
import os

load_dotenv(".env")

def load_environment_variables():
    d = {}
    # Load environment variables from .env file
    # Get the environment variables
    d['MONGO_URI'] = os.getenv("MONGO_URI")
    d['MONGO_DB'] = os.getenv("MONGO_DB")
    d['AUTH0_DOMAIN'] = os.getenv("AUTH0_DOMAIN")
    d['API_IDENTIFIER'] = os.getenv("API_IDENTIFIER")
    d['ALGORITHMS'] = os.getenv("ALGORITHMS")
    return d