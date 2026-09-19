from fastapi import APIRouter
from fastapi import Depends

from auth.security import get_current_user

from database.mongodb import assessment_collection


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("")
async def get_dashboard(
    current_user=Depends(
        get_current_user
    )
):

    user_id = current_user["_id"]


    # =====================================================
    # TOTAL ASSESSMENTS
    # =====================================================

    total_assessments = (
        await assessment_collection.count_documents(
            {
                "user_id": user_id
            }
        )
    )


    # =====================================================
    # AVERAGE SCORE
    # =====================================================

    average_pipeline = [

        {
            "$match": {
                "user_id": user_id
            }
        },

        {
            "$group": {

                "_id": None,

                "average_score": {
                    "$avg":
                        "$prediction.mental_health_score"
                }

            }
        }

    ]


    # IMPORTANT:
    # aggregate() itself must be awaited first

    average_cursor = await (
        assessment_collection.aggregate(
            average_pipeline
        )
    )


    average_result = await (
        average_cursor.to_list(
            length=1
        )
    )


    average_score = None


    if average_result:

        average_score = round(
            average_result[0]["average_score"],
            2
        )


    # =====================================================
    # RECENT ASSESSMENTS
    # =====================================================

    recent_cursor = (
        assessment_collection

        .find(
            {
                "user_id": user_id
            }
        )

        .sort(
            "created_at",
            -1
        )

        .limit(10)
    )


    recent_documents = await (
        recent_cursor.to_list(
            length=10
        )
    )


    recent_assessments = [

        {
            "id": str(
                document["_id"]
            ),

            "created_at":
                document["created_at"],

            "score":
                document["prediction"][
                    "mental_health_score"
                ]
        }

        for document in recent_documents

    ]


    # =====================================================
    # LATEST SCORE
    # =====================================================

    latest_score = (

        recent_assessments[0]["score"]

        if recent_assessments

        else None

    )


    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "user": {

            "id": str(
                current_user["_id"]
            ),

            "full_name":
                current_user["full_name"],

            "email":
                current_user["email"]

        },

        "stats": {

            "total_assessments":
                total_assessments,

            "average_score":
                average_score,

            "latest_score":
                latest_score

        },

        "recent_assessments":
            recent_assessments

    }