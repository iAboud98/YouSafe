from app.models.level import LevelIntroductionRequest, LevelIntroductionResponse
from app.services.ai_service import generate_introduction


def _generate_level_id(situation_type: str) -> str:
    slug = situation_type.strip().lower().replace(" ", "_")
    return f"{slug}_01"


async def get_level_introduction(
    request: LevelIntroductionRequest,
) -> LevelIntroductionResponse:
    introduction_text = await generate_introduction(
        player_name=request.player_name,
        level_title=request.level_title,
        level_description=request.level_description,
        situation_type=request.situation_type,
    )

    return LevelIntroductionResponse(
        level_id=_generate_level_id(request.situation_type),
        assistant_name="Youssef",
        introduction_text=introduction_text,
        status="success",
    )
