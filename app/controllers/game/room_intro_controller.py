import logging

from fastapi import HTTPException

from app.config.settings import settings
from app.models.game.room_intro import RoomIntroRequest, RoomIntroResponse
from app.services.game.room_intro_service import generate_room_intro

logger = logging.getLogger(__name__)


async def handle_room_intro(request: RoomIntroRequest) -> RoomIntroResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        assistant_text = await generate_room_intro(
            player_name=request.player_name,
            room_title=request.room_title,
            room_description=request.room_description,
            situation_type=request.situation_type,
        )

        return RoomIntroResponse(
            session_id=request.session_id,
            room_id=request.room_id,
            assistant_text=assistant_text,
            status="success",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Room intro error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
