from fastapi import APIRouter, Request

from app.controllers.level_controller import introduce_level
from app.models.level import LevelIntroductionRequest, LevelIntroductionResponse
from app.security import enforce_ai_rate_limit

router = APIRouter(prefix="/api/levels", tags=["Levels"])


@router.post("/introduction", response_model=LevelIntroductionResponse)
async def level_introduction(http_request: Request, payload: LevelIntroductionRequest):
    enforce_ai_rate_limit(http_request)
    return await introduce_level(payload)
