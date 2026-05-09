from fastapi import APIRouter, Request

from app.controllers.game.dangerous_move_controller import handle_dangerous_move
from app.models.game.dangerous_move import DangerousMoveRequest, DangerousMoveResponse
from app.security import enforce_ai_rate_limit

router = APIRouter(prefix="/api/game/dangerous-move", tags=["Game - Dangerous Move"])


@router.post("", response_model=DangerousMoveResponse)
async def dangerous_move(http_request: Request, payload: DangerousMoveRequest):
    enforce_ai_rate_limit(http_request)
    return await handle_dangerous_move(payload)
