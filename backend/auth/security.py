import os

from datetime import datetime, timedelta, timezone

import jwt

from bson import ObjectId

from bson.errors import InvalidId

from dotenv import load_dotenv

from fastapi import Depends, HTTPException, status

from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from jwt.exceptions import InvalidTokenError

from pwdlib import PasswordHash

from database.mongodb import users_collection


load_dotenv()


JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)

JWT_EXPIRE_MINUTES = int(
    os.getenv(
        "JWT_EXPIRE_MINUTES",
        "10080"
    )
)


if not JWT_SECRET_KEY:
    raise RuntimeError(
        "JWT_SECRET_KEY পাওয়া যায়নি। .env file check করো।"
    )


password_hash = PasswordHash.recommended()

bearer_scheme = HTTPBearer()


def hash_password(password: str) -> str:

    return password_hash.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    return password_hash.verify(
        plain_password,
        hashed_password
    )


def create_access_token(
    user_id: ObjectId
) -> str:

    expire = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=JWT_EXPIRE_MINUTES
        )
    )

    payload = {
        "sub": str(user_id),
        "exp": expire,
    }

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme
    )
):

    token = credentials.credentials


    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token.",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )


    try:

        payload = jwt.decode(
            token,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHM]
        )

        user_id = payload.get("sub")


        if not user_id:
            raise credentials_exception


        object_id = ObjectId(user_id)


    except (
        InvalidTokenError,
        InvalidId
    ):

        raise credentials_exception


    user = await users_collection.find_one(
        {
            "_id": object_id
        }
    )


    if not user:
        raise credentials_exception


    return user