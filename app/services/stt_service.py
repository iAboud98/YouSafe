import logging

import httpx

from app.config.settings import settings

logger = logging.getLogger(__name__)


async def transcribe_audio(audio_bytes: bytes) -> str:
    """Transcribe audio via Munsit REST API. Returns the transcribed text."""
    url = f"{settings.MUNSIT_BASE_URL}/audio/transcribe"
    headers = {
        "x-api-key": settings.MUNSIT_API_KEY,
    }
    files = {
        "file": ("recording.wav", audio_bytes, "audio/wav"),
    }
    data = {
        "model": settings.MUNSIT_STT_MODEL,
    }
    print(f"[STT] Sending {len(audio_bytes)} bytes -> {url} model={settings.MUNSIT_STT_MODEL}")
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, headers=headers, files=files, data=data, timeout=30.0)
        print(f"[STT] Response status={resp.status_code}")
        print(f"[STT] Response body: {resp.text[:500]}")
        resp.raise_for_status()
        result = resp.json()
        transcript = result.get("data", {}).get("transcription", "")
        print(f"[STT] Transcript: '{transcript}'")
        return transcript
