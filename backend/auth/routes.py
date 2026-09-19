from datetime import datetime, timezone

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from pymongo.errors import DuplicateKeyError

from auth.schemas import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)

from auth.security import (
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)

from database.mongodb import users_collection


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


def serialize_user(user):

    return UserResponse(

        id=str(user["_id"]),

        full_name=user["full_name"],

        email=user["email"],

        created_at=user["created_at"]

    )


# =========================================================
# REGISTER
# =========================================================

@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED
)
async def register(data: RegisterRequest):

    email = (
        str(data.email)
        .lower()
        .strip()
    )


    existing_user = await users_collection.find_one(
        {
            "email": email
        }
    )


    if existing_user:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists."
        )


    user_document = {

        "full_name": data.full_name.strip(),

        "email": email,

        "password_hash": hash_password(
            data.password
        ),

        "created_at": datetime.now(
            timezone.utc
        )

    }


    try:

        result = await users_collection.insert_one(
            user_document
        )

    except DuplicateKeyError:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists."
        )


    user_document["_id"] = result.inserted_id


    token = create_access_token(
        result.inserted_id
    )


    return {

        "access_token": token,

        "token_type": "bearer",

        "user": serialize_user(
            user_document
        )

    }


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/login",
    response_model=TokenResponse
)
async def login(data: LoginRequest):

    email = (
        str(data.email)
        .lower()
        .strip()
    )


    user = await users_collection.find_one(
        {
            "email": email
        }
    )


    if not user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )


    valid_password = verify_password(
        data.password,
        user["password_hash"]
    )


    if not valid_password:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )


    token = create_access_token(
        user["_id"]
    )


    return {

        "access_token": token,

        "token_type": "bearer",

        "user": serialize_user(user)

    }


# =========================================================
# CURRENT USER
# =========================================================

@router.get(
    "/me",
    response_model=UserResponse
)
async def get_me(
    current_user=Depends(
        get_current_user
    )
):

    return serialize_user(
        current_user
    )