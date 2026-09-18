import joblib
import pandas as pd

from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database.mongodb import (
    mongodb_lifespan,
    assessment_collection,
)


# =========================================================
# LOAD MODEL
# =========================================================

model = joblib.load("Mental_Health_Model.pkl")


# =========================================================
# TOP COUNTRIES
# =========================================================

top_countries = [
    "Other",
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "Mexico",
    "Turkey",
    "France",
]


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Mental Health Prediction API",
    lifespan=mongodb_lifespan,
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# PYDANTIC MODEL
# =========================================================

class StudentData(BaseModel):
    age: int = Field(..., ge=10, le=100)

    gender: Literal[
        "Male",
        "Female"
    ]

    country: str

    academic_level: Literal[
        "Undergraduate",
        "Graduate",
        "High School"
    ]

    most_used_platform: Literal[
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Snapchat",
        "Twitter",
        "YouTube",
        "TikTok",
        "LINE",
        "KakaoTalk",
        "VKontakte",
        "WhatsApp",
        "WeChat"
    ]

    purpose_of_use: Literal[
        "Networking",
        "Education",
        "Entertainment",
        "News"
    ]

    avg_daily_usage_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    daily_unlocks: int = Field(
        ...,
        ge=0
    )

    study_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    physical_activity_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    sleep_hours_per_night: float = Field(
        ...,
        ge=0,
        le=24
    )

    stress_level: Literal[
        "Medium",
        "Low",
        "Very High",
        "High"
    ]


# =========================================================
# RESPONSE MODEL
# =========================================================

class PredictionResponse(BaseModel):
    predicted_mental_health_score: float


# =========================================================
# ROOT ENDPOINT
# =========================================================

@app.get("/")
def greet():
    return {
        "Welcome": "Mental Health Prediction"
    }


# =========================================================
# PREDICTION ENDPOINT
# =========================================================

@app.post(
    "/predict",
    response_model=PredictionResponse
)
async def predict(data: StudentData):

    # -----------------------------------------------------
    # 1. GROUP COUNTRY
    # -----------------------------------------------------

    country_group = (
        data.country
        if data.country in top_countries
        else "Other"
    )


    # -----------------------------------------------------
    # 2. CREATE MODEL INPUT
    # -----------------------------------------------------

    input_row = pd.DataFrame([{

        "Age": data.age,

        "Gender": data.gender,

        "Country": data.country,

        "Academic_Level": data.academic_level,

        "Most_Used_Platform": data.most_used_platform,

        "Purpose_Of_Use": data.purpose_of_use,

        "Avg_Daily_Usage_Hours":
            data.avg_daily_usage_hours,

        "Daily_Unlocks":
            data.daily_unlocks,

        "Study_Hours":
            data.study_hours,

        "Physical_Activity_Hours":
            data.physical_activity_hours,

        "Sleep_Hours_Per_Night":
            data.sleep_hours_per_night,

        "Stress_Level":
            data.stress_level,

        "Grouped_country":
            country_group,

    }])


    # -----------------------------------------------------
    # 3. ML PREDICTION
    # -----------------------------------------------------

    prediction = model.predict(input_row)[0]

    score = round(
        float(prediction),
        2
    )


    # -----------------------------------------------------
    # 4. SAVE ASSESSMENT TO MONGODB
    # -----------------------------------------------------

    assessment_document = {

        "created_at": datetime.now(timezone.utc),

        "input": {

            "age": data.age,

            "gender": data.gender,

            "country": data.country,

            "academic_level":
                data.academic_level,

            "most_used_platform":
                data.most_used_platform,

            "purpose_of_use":
                data.purpose_of_use,

            "avg_daily_usage_hours":
                data.avg_daily_usage_hours,

            "daily_unlocks":
                data.daily_unlocks,

            "study_hours":
                data.study_hours,

            "physical_activity_hours":
                data.physical_activity_hours,

            "sleep_hours_per_night":
                data.sleep_hours_per_night,

            "stress_level":
                data.stress_level,

        },

        "prediction": {

            "mental_health_score":
                score,

        },

    }


    # Insert into MongoDB
    result = await assessment_collection.insert_one(
        assessment_document
    )


    # Optional backend log
    print(
        f"✅ Assessment saved to MongoDB: {result.inserted_id}"
    )


    # -----------------------------------------------------
    # 5. RETURN SCORE TO FRONTEND
    # -----------------------------------------------------

    return PredictionResponse(
        predicted_mental_health_score=score
    )