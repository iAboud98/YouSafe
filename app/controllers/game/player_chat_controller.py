import logging

from fastapi import HTTPException

from app.config.settings import settings
from app.models.game.player_chat import GameChatMessage, PlayerChatRequest, PlayerChatResponse
from app.services.game.player_chat_service import generate_player_chat_reply

logger = logging.getLogger(__name__)


async def handle_player_chat(request: PlayerChatRequest) -> PlayerChatResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        history_dicts = [{"role": m.role, "content": m.content} for m in request.history]

        assistant_text = await generate_player_chat_reply(
            player_name=request.player_name,
            room_title=request.room_title,
            room_description=request.room_description,
            situation_type=request.situation_type,
            history=history_dicts,
            user_message=request.message,
        )

        updated_history = [
            *request.history,
            GameChatMessage(role="user", content=request.message),
            GameChatMessage(role="assistant", content=assistant_text),
        ]

        return PlayerChatResponse(
            session_id=request.session_id,
            room_id=request.room_id,
            player_message=request.message,
            assistant_text=assistant_text,
            history=updated_history,
            status="success",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Player chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
