import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE = os.getenv(
    "MONGODB_DATABASE",
    "mental_health_db"
)

if not MONGODB_URI:
    raise RuntimeError(
        "MONGODB_URI পাওয়া যায়নি। .env file check করো।"
    )

client = AsyncMongoClient(
    MONGODB_URI,
    server_api=ServerApi("1")
)

database = client[MONGODB_DATABASE]

assessment_collection = database["assessments"]


@asynccontextmanager
async def mongodb_lifespan(app):
    try:
        await database.command("ping")
        print("✅ MongoDB  connected!")
        yield
    except Exception as e:
        print("❌ MongoDB connection failed!")
        print(f"Error: {e}")
        raise
    finally:
        await client.close()
        print("🔌 MongoDB connection closed.")