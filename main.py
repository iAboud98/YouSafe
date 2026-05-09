from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.routes.conversation_routes import router as conversation_router
from app.routes.level_routes import router as level_router
from app.routes.talk_routes import router as talk_router

app = FastAPI(
    title="YouSafe API",
    description="Backend API for YouSafe — a safety-awareness educational game for children.",
    version="1.0.0",
)

print(f"[CORS] Allowed origins: {settings.cors_allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(level_router)
app.include_router(conversation_router)
app.include_router(talk_router)


@app.get("/")
async def root():
    return {"message": "YouSafe API is running."}
