from fastapi import APIRouter, Request

from app.controllers.game.room_finish_controller import handle_room_finish
from app.models.game.room_finish import RoomFinishRequest, RoomFinishResponse
from app.security import enforce_ai_rate_limit

router = APIRouter(prefix="/api/game/room-finish", tags=["Game - Room Finish"])


@router.post("", response_model=RoomFinishResponse)
async def room_finish(http_request: Request, payload: RoomFinishRequest):
    enforce_ai_rate_limit(http_request)
    return await handle_room_finish(payload)
