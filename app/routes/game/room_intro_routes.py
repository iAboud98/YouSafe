from fastapi import APIRouter, Request

from app.controllers.game.room_intro_controller import handle_room_intro
from app.models.game.room_intro import RoomIntroRequest, RoomIntroResponse
from app.security import enforce_ai_rate_limit

router = APIRouter(prefix="/api/game/room-intro", tags=["Game - Room Intro"])


@router.post("", response_model=RoomIntroResponse)
async def room_intro(http_request: Request, payload: RoomIntroRequest):
    enforce_ai_rate_limit(http_request)
    return await handle_room_intro(payload)
