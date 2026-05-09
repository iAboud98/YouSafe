from fastapi import APIRouter, Request

from app.controllers.game.player_chat_controller import handle_player_chat
from app.models.game.player_chat import PlayerChatRequest, PlayerChatResponse
from app.security import enforce_ai_rate_limit

router = APIRouter(prefix="/api/game/player-chat", tags=["Game - Player Chat"])


@router.post("", response_model=PlayerChatResponse)
async def player_chat(http_request: Request, payload: PlayerChatRequest):
    enforce_ai_rate_limit(http_request)
    return await handle_player_chat(payload)
