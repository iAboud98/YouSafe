import logging

from fastapi import APIRouter, HTTPException, Request

from app.config.settings import settings
from app.models.conversation import ChatResponse, TextChatRequest
from app.security import enforce_ai_rate_limit
from app.services import conversation_service
from app.services.tts_service import synthesize_speech

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/conversation", tags=["Conversation"])


@router.post("/text", response_model=ChatResponse)
async def text_chat(http_request: Request, payload: TextChatRequest):
    """Service 2: Text in → AI response + TTS audio out."""
    enforce_ai_rate_limit(http_request)

    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        assistant_text = await conversation_service.chat(
            session_id=payload.session_id,
            player_name=payload.player_name,
            level_title=payload.level_title,
            situation_type=payload.situation_type,
            level_description=payload.level_description,
            user_message=payload.message,
        )

        audio_base64 = ""
        if settings.MUNSIT_API_KEY:
            audio_base64 = await synthesize_speech(assistant_text)

        return ChatResponse(
            session_id=payload.session_id,
            player_message=payload.message,
            assistant_text=assistant_text,
            audio_base64=audio_base64,
            status="success",
        )
    except Exception as e:
        logger.error(f"Text chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
