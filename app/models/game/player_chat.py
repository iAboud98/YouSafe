from pydantic import BaseModel, Field, field_validator

_ALLOWED_ROLES = {"user", "assistant"}


class GameChatMessage(BaseModel):
    role: str
    content: str = Field(min_length=1, max_length=1000)

    @field_validator("role")
    @classmethod
    def _validate_role(cls, v: str) -> str:
        if v not in _ALLOWED_ROLES:
            raise ValueError(f"role must be one of {sorted(_ALLOWED_ROLES)}")
        return v


class PlayerChatRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=120)
    player_name: str = Field(min_length=1, max_length=80)
    room_id: str = Field(min_length=1, max_length=120)
    room_title: str = Field(min_length=1, max_length=160)
    room_description: str = Field(min_length=1, max_length=1500)
    situation_type: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=1000)
    history: list[GameChatMessage] = Field(default_factory=list, max_length=20)

    @field_validator("message")
    @classmethod
    def _non_empty_message(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("message must not be empty")
        return v


class PlayerChatResponse(BaseModel):
    session_id: str
    room_id: str
    player_message: str
    assistant_text: str
    history: list[GameChatMessage]
    status: str
