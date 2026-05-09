import base64
import logging

import httpx

from app.config.settings import settings

logger = logging.getLogger(__name__)


async def synthesize_speech(text: str) -> str:
    """Synthesize full text to audio via REST API. Returns base64-encoded PCM."""
    url = f"{settings.MUNSIT_BASE_URL}/text-to-speech/{settings.MUNSIT_TTS_MODEL}"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": settings.MUNSIT_API_KEY,
    }
    body = {
        "voice_id": settings.MUNSIT_TTS_VOICE,
        "text": text,
        "stability": 0.5,
        "speed": 1.0,
        "streaming": True,
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=body, headers=headers, timeout=30.0)
        resp.raise_for_status()
        return base64.b64encode(resp.content).decode()
