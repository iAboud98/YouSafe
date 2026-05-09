from typing import Optional

from openai import AsyncOpenAI

from app.config.settings import settings


def _build_system_prompt(
    player_name: str,
    room_title: str,
    room_description: str,
    situation_type: str,
    action_description: Optional[str],
) -> str:
    # TODO: write the dangerous move system prompt
    return ""


async def generate_dangerous_move_response(
    player_name: str,
    room_title: str,
    room_description: str,
    situation_type: str,
    action_description: Optional[str] = None,
) -> str:
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    system_prompt = _build_system_prompt(
        player_name=player_name,
        room_title=room_title,
        room_description=room_description,
        situation_type=situation_type,
        action_description=action_description,
    )

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": action_description or "اللاعب سوى حركة خطيرة."},
        ],
        temperature=0.7,
        max_tokens=300,
    )

    return response.choices[0].message.content
