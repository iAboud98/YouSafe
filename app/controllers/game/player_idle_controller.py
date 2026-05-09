import logging

from fastapi import HTTPException

from app.config.settings import settings
from app.models.game.player_idle import PlayerIdleRequest, PlayerIdleResponse
from app.services.game.player_idle_service import generate_idle_nudge

logger = logging.getLogger(__name__)


async def handle_player_idle(request: PlayerIdleRequest) -> PlayerIdleResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        assistant_text = await generate_idle_nudge(
            player_name=request.player_name,
            room_title=request.room_title,
            room_description=request.room_description,
            situation_type=request.situation_type,
        )

        return PlayerIdleResponse(
            session_id=request.session_id,
            room_id=request.room_id,
            assistant_text=assistant_text,
            status="success",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Player idle error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
