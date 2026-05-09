from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.routes.game.dangerous_move_routes import router as dangerous_move_router
from app.routes.game.player_chat_routes import router as player_chat_router
from app.routes.game.player_idle_routes import router as player_idle_router
from app.routes.game.room_finish_routes import router as room_finish_router
from app.routes.game.room_intro_routes import router as room_intro_router
from app.routes.website_chat_routes import router as website_chat_router

app = FastAPI(
    title="YouSafe API",
    description="Backend API for YouSafe — a safety-awareness educational game for children.",
    version="1.0.0",
)

print(f"[CORS] Allowed origins: {settings.cors_allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Website
app.include_router(website_chat_router)

# Game
app.include_router(room_intro_router)
app.include_router(room_finish_router)
app.include_router(dangerous_move_router)
app.include_router(player_idle_router)
app.include_router(player_chat_router)


@app.get("/")
async def root():
    return {"message": "YouSafe API is running."}
