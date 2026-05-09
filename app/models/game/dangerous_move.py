from typing import Optional

from pydantic import BaseModel, Field


class DangerousMoveRequest(BaseModel):
    session_id: str = Field(min_length=1, max_length=120)
    player_name: str = Field(min_length=1, max_length=80)
    room_id: str = Field(min_length=1, max_length=120)
    room_title: str = Field(min_length=1, max_length=160)
    room_description: str = Field(min_length=1, max_length=1500)
    situation_type: str = Field(min_length=1, max_length=120)
    action_description: Optional[str] = Field(default="", max_length=500)


class DangerousMoveResponse(BaseModel):
    session_id: str
    room_id: str
    assistant_text: str
    status: str
