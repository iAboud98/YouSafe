from fastapi import HTTPException

from app.config.settings import settings
from app.models.level import LevelIntroductionRequest, LevelIntroductionResponse
from app.services.level_service import get_level_introduction


async def introduce_level(
    request: LevelIntroductionRequest,
) -> LevelIntroductionResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OpenAI API key is not configured. Set OPENAI_API_KEY in your .env file.",
        )

    try:
        return await get_level_introduction(request)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate level introduction: {str(e)}",
        )
