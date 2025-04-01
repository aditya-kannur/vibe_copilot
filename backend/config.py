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
    print("❌ MONGO_URI not found in .env file")
    exit()

# Connect to MongoDB
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db = client["vibe_copilot"]  # Replace with your actual database name

# Test Connection
try:
    client.admin.command("ping")
    print("✅ Successfully connected to MongoDB!")
except Exception as e:
    print("❌ MongoDB connection error:", e)


# Function to get the database instance
def get_db():
    return db
