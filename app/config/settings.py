from pydantic_settings import BaseSettings


DEFAULT_CORS_ALLOWED_ORIGINS = ",".join(
    [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ]
)


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"

    MUNSIT_API_KEY: str = ""
    MUNSIT_BASE_URL: str = "https://api.munsit.com/api/v1"
    MUNSIT_STT_MODEL: str = "munsit-en-ar"
    MUNSIT_TTS_MODEL: str = "faseeh-v1-preview"
    MUNSIT_TTS_VOICE: str = "ar-najdi-male-2"

    CORS_ALLOWED_ORIGINS: str = DEFAULT_CORS_ALLOWED_ORIGINS

    model_config = {"env_file": ".env"}

    @property
    def cors_allowed_origins(self) -> list[str]:
        return [
            origin.strip().rstrip("/")
            for origin in self.CORS_ALLOWED_ORIGINS.split(",")
            if origin.strip()
        ]


settings = Settings()
