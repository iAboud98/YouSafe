import logging

from fastapi import HTTPException

from app.config.settings import settings
from app.models.website_chat import (
    WebsiteChatMessage,
    WebsiteLevelContext,
    WebsiteTextRequest,
    WebsiteTextResponse,
    WebsiteVoiceResponse,
)
from app.services.voice.stt_service import transcribe_audio
from app.services.voice.tts_service import synthesize_speech
from app.services.website.website_chat_service import generate_website_reply

logger = logging.getLogger(__name__)


async def website_text_chat(request: WebsiteTextRequest) -> WebsiteTextResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        history_dicts = [{"role": m.role, "content": m.content} for m in request.history]

        assistant_text = await generate_website_reply(
            player_name=request.player_name,
            history=history_dicts,
            user_message=request.message,
            level_context=request.level_context,
        )

        audio_base64 = ""
        if request.tts_enabled:
            if not settings.MUNSIT_API_KEY:
                logger.warning("tts_enabled=true but MUNSIT_API_KEY missing — returning text only")
            else:
                audio_base64 = await synthesize_speech(assistant_text)

        updated_history = [
            *request.history,
            WebsiteChatMessage(role="user", content=request.message),
            WebsiteChatMessage(role="assistant", content=assistant_text),
        ]

        return WebsiteTextResponse(
            session_id=request.session_id,
            player_message=request.message,
            assistant_text=assistant_text,
            audio_base64=audio_base64,
            history=updated_history,
            status="success",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Website text chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def website_voice_chat(
    audio_bytes: bytes,
    session_id: str,
    player_name: str,
    history: list[WebsiteChatMessage],
    level_context: WebsiteLevelContext | None,
    tts_enabled: bool,
) -> WebsiteVoiceResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    if not settings.MUNSIT_API_KEY:
        raise HTTPException(status_code=500, detail="MUNSIT_API_KEY not configured")

    try:
        transcript = await transcribe_audio(audio_bytes)
        if not transcript.strip():
            raise HTTPException(status_code=400, detail="No speech detected")

        history_dicts = [{"role": m.role, "content": m.content} for m in history]

        assistant_text = await generate_website_reply(
            player_name=player_name,
            history=history_dicts,
            user_message=transcript,
            level_context=level_context,
        )

        audio_base64 = ""
        if tts_enabled:
            try:
                audio_base64 = await synthesize_speech(assistant_text)
            except Exception as e:
                logger.warning(f"TTS failed (non-fatal): {e}")

        updated_history = [
            *history,
            WebsiteChatMessage(role="user", content=transcript),
            WebsiteChatMessage(role="assistant", content=assistant_text),
        ]

        return WebsiteVoiceResponse(
            session_id=session_id,
            transcript=transcript,
            assistant_text=assistant_text,
            audio_base64=audio_base64,
            history=updated_history,
            status="success",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Website voice chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
