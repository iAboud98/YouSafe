import json
import logging

from fastapi import APIRouter, File, Form, Request, UploadFile

from app.controllers.website_chat_controller import website_text_chat, website_voice_chat
from app.models.website_chat import (
    WebsiteChatMessage,
    WebsiteLevelContext,
    WebsiteTextRequest,
    WebsiteTextResponse,
    WebsiteVoiceResponse,
)
from app.security import enforce_ai_rate_limit

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/talk", tags=["Website Chat"])


@router.post("/text", response_model=WebsiteTextResponse)
async def text_chat(http_request: Request, payload: WebsiteTextRequest):
    enforce_ai_rate_limit(http_request)
    return await website_text_chat(payload)


@router.post("/voice", response_model=WebsiteVoiceResponse)
async def voice_chat(
    http_request: Request,
    audio: UploadFile = File(...),
    session_id: str = Form(...),
    player_name: str = Form(...),
    history: str = Form(default="[]"),
    level_context: str = Form(default=""),
    tts_enabled: bool = Form(default=True),
):
    enforce_ai_rate_limit(http_request)

    audio_bytes = await audio.read()
    parsed_history = [WebsiteChatMessage(**m) for m in json.loads(history)]

    parsed_level_context = None
    if level_context:
        parsed_level_context = WebsiteLevelContext(**json.loads(level_context))

    return await website_voice_chat(
        audio_bytes=audio_bytes,
        session_id=session_id,
        player_name=player_name,
        history=parsed_history,
        level_context=parsed_level_context,
        tts_enabled=tts_enabled,
    )
