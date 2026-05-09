import json
import logging

from fastapi import HTTPException

from app.config.settings import settings
from app.models.talk import LevelContext, TalkMessage, TextTalkRequest, TextTalkResponse, VoiceTalkResponse
from app.services.stt_service import transcribe_audio
from app.services.talk_service import reply_to_message
from app.services.tts_service import synthesize_speech

logger = logging.getLogger(__name__)


async def text_talk(request: TextTalkRequest) -> TextTalkResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY not configured",
        )

    try:
        assistant_text = await reply_to_message(
            player_name=request.player_name,
            history=request.history,
            user_message=request.message,
            level_context=request.level_context,
        )

        audio_base64 = ""
        if request.tts_enabled:
            if not settings.MUNSIT_API_KEY:
                logger.warning(
                    "tts_enabled=true but MUNSIT_API_KEY missing — returning text only"
                )
            else:
                audio_base64 = await synthesize_speech(assistant_text)

        updated_history = [
            *request.history,
            TalkMessage(role="user", content=request.message),
            TalkMessage(role="assistant", content=assistant_text),
        ]

        return TextTalkResponse(
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
        logger.error(f"Talk text error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def voice_talk(
    audio_bytes: bytes,
    session_id: str,
    player_name: str,
    history: list[TalkMessage],
    level_context: LevelContext | None,
    tts_enabled: bool,
) -> VoiceTalkResponse:
    if not settings.OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    if not settings.MUNSIT_API_KEY:
        raise HTTPException(status_code=500, detail="MUNSIT_API_KEY not configured")

    try:
        transcript = await transcribe_audio(audio_bytes)
        if not transcript.strip():
            raise HTTPException(status_code=400, detail="No speech detected")

        assistant_text = await reply_to_message(
            player_name=player_name,
            history=history,
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
            TalkMessage(role="user", content=transcript),
            TalkMessage(role="assistant", content=assistant_text),
        ]

        return VoiceTalkResponse(
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
        logger.error(f"Talk voice error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
