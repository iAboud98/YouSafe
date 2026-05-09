import logging

from fastapi import HTTPException

from app.config.settings import settings
from app.models.game.dangerous_move import DangerousMoveRequest, DangerousMoveResponse
from app.services.game.dangerous_move_service import generate_dangerous_move_response

logger = logging.getLogger(__name__)


async def handle_dangerous_move(request: DangerousMoveRequest) -> DangerousMoveResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        assistant_text = await generate_dangerous_move_response(
            player_name=request.player_name,
            room_title=request.room_title,
            room_description=request.room_description,
            situation_type=request.situation_type,
            action_description=request.action_description,
        )

        return DangerousMoveResponse(
            session_id=request.session_id,
            room_id=request.room_id,
            assistant_text=assistant_text,
            status="success",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Dangerous move error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
