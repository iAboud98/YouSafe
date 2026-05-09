from typing import Optional

from pydantic import BaseModel, Field, field_validator

_ALLOWED_ROLES = {"user", "assistant"}


class WebsiteChatMessage(BaseModel):
    role: str
    content: str = Field(min_length=1, max_length=1000)

    @field_validator("role")
    @classmethod
    def _validate_role(cls, v: str) -> str:
        if v not in _ALLOWED_ROLES:
            raise ValueError(f"role must be one of {sorted(_ALLOWED_ROLES)}")
        return v


class WebsiteLevelContext(BaseModel):
    level_title: Optional[str] = Field(default="", max_length=160)
    situation_type: Optional[str] = Field(default="", max_length=120)
    level_description: Optional[str] = Field(default="", max_length=1500)


class WebsiteTextRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=120)
    player_name: str = Field(min_length=1, max_length=80)
    message: str = Field(min_length=1, max_length=1000)
    history: list[WebsiteChatMessage] = Field(default_factory=list, max_length=20)
    level_context: Optional[WebsiteLevelContext] = None
    tts_enabled: bool = True

    @field_validator("message")
    @classmethod
    def _non_empty_message(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("message must not be empty")
        return v


class WebsiteTextResponse(BaseModel):
    session_id: str
    player_message: str
    assistant_text: str
    audio_base64: str
    history: list[WebsiteChatMessage]
    status: str


class WebsiteVoiceResponse(BaseModel):
    session_id: str
    transcript: str
    assistant_text: str
    audio_base64: str
    history: list[WebsiteChatMessage]
    status: str
