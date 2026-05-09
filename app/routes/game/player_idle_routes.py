from fastapi import APIRouter, Request

from app.controllers.game.player_idle_controller import handle_player_idle
from app.models.game.player_idle import PlayerIdleRequest, PlayerIdleResponse
from app.security import enforce_ai_rate_limit

router = APIRouter(prefix="/api/game/player-idle", tags=["Game - Player Idle"])


@router.post("", response_model=PlayerIdleResponse)
async def player_idle(http_request: Request, payload: PlayerIdleRequest):
    enforce_ai_rate_limit(http_request)
    return await handle_player_idle(payload)
