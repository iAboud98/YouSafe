"""Talk-with-YouSafe orchestration.

This service takes a player's text message + prior history (sent by the
client/Unity each request — there is no DB persistence layer in this project,
so history is kept client-side) and returns YouSafe's reply.

It is intentionally thin: AI work lives in `ai_service`, TTS lives in
`tts_service`, and STT lives in `stt_service`. Routes/controllers compose
them.
"""

from typing import Optional

from app.models.talk import LevelContext, TalkMessage
from app.services.ai_service import generate_talk_response


async def reply_to_message(
    player_name: str,
    history: list[TalkMessage],
    user_message: str,
    level_context: Optional[LevelContext] = None,
) -> str:
    history_dicts = [{"role": h.role, "content": h.content} for h in history]
    return await generate_talk_response(
        player_name=player_name,
        history=history_dicts,
        user_message=user_message,
        level_context=level_context,
    )
