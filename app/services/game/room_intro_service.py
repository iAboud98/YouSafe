from openai import AsyncOpenAI

from app.config.settings import settings


def _build_system_prompt(
    player_name: str,
    room_title: str,
    room_description: str,
    situation_type: str,
) -> str:
    # TODO: write the room introduction system prompt
    return ""


async def generate_room_intro(
    player_name: str,
    room_title: str,
    room_description: str,
    situation_type: str,
) -> str:
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    system_prompt = _build_system_prompt(
        player_name=player_name,
        room_title=room_title,
        room_description=room_description,
        situation_type=situation_type,
    )

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "قدم لي هذه الغرفة."},
        ],
        temperature=0.7,
        max_tokens=300,
    )

    return response.choices[0].message.content
