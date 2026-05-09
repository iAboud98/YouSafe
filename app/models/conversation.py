from pydantic import BaseModel, Field


class TextChatRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=120)
    player_name: str = Field(min_length=1, max_length=80)
    level_title: str = Field(min_length=1, max_length=160)
    situation_type: str = Field(min_length=1, max_length=120)
    level_description: str = Field(min_length=1, max_length=1500)
    message: str = Field(min_length=1, max_length=1000)


class ChatResponse(BaseModel):
    session_id: str
    player_message: str
    assistant_text: str
    audio_base64: str
    status: str
