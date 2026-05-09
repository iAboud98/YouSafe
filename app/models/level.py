from pydantic import BaseModel, Field


class LevelIntroductionRequest(BaseModel):
    player_name: str = Field(min_length=1, max_length=80)
    level_title: str = Field(min_length=1, max_length=160)
    level_description: str = Field(min_length=1, max_length=1500)
    situation_type: str = Field(min_length=1, max_length=120)


class LevelIntroductionResponse(BaseModel):
    level_id: str
    assistant_name: str
    introduction_text: str
    status: str
