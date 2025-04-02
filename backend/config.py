import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Check if URI is present
if not MONGO_URI:
    print(" No Mongo URI found")
    exit()

# MongoDB connection
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db = client["vibe_copilot"] 

# Testing
try:
    client.admin.command("ping")
    print("Successfully connected")
except Exception as e:
    print("MongoDB connection error:", e)


# Database instance
def get_db():
    return db
