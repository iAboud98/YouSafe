"""Talk-with-YouSafe routes.

Endpoints
---------
POST /api/talk/text          — text in, AI text + TTS audio out
POST /api/talk/voice         — audio file in, STT → AI → TTS audio out
"""

import json
import logging

from fastapi import APIRouter, File, Form, Request, UploadFile

from app.controllers.talk_controller import text_talk, voice_talk
from app.models.talk import LevelContext, TalkMessage, TextTalkRequest, TextTalkResponse, VoiceTalkResponse
from app.security import enforce_ai_rate_limit

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/talk", tags=["Talk"])


@router.post("/text", response_model=TextTalkResponse)
async def talk_text(http_request: Request, payload: TextTalkRequest):
    """Free chat with YouSafe — text in, text + TTS audio out."""
    enforce_ai_rate_limit(http_request)
    return await text_talk(payload)


@router.post("/voice", response_model=VoiceTalkResponse)
async def talk_voice(
    http_request: Request,
    audio: UploadFile = File(...),
    session_id: str = Form(...),
    player_name: str = Form(...),
    history: str = Form(default="[]"),
    level_context: str = Form(default=""),
    tts_enabled: bool = Form(default=True),
):
    """Voice chat with YouSafe — audio file in, STT → AI → TTS audio out."""
    enforce_ai_rate_limit(http_request)

    audio_bytes = await audio.read()

    parsed_history = [TalkMessage(**m) for m in json.loads(history)]

    parsed_level_context = None
    if level_context:
        parsed_level_context = LevelContext(**json.loads(level_context))

    return await voice_talk(
        audio_bytes=audio_bytes,
        session_id=session_id,
        player_name=player_name,
        history=parsed_history,
        level_context=parsed_level_context,
        tts_enabled=tts_enabled,
    )
