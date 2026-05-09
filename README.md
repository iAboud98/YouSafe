# YouSafe Backend API

Backend API for **YouSafe** — a safety-awareness educational game for children. Powered by FastAPI and OpenAI.

## Project Structure

```
YouSafe/
├── main.py                      # FastAPI app entry point
├── requirements.txt
├── .env.example
├── .gitignore
└── app/
    ├── config/
    │   └── settings.py          # Environment variable configuration
    ├── models/
    │   └── level.py             # Request/response schemas
    ├── routes/
    │   └── level_routes.py      # API route definitions
    ├── controllers/
    │   └── level_controller.py  # Request validation and orchestration
    └── services/
        ├── ai_service.py        # OpenAI API integration
        └── level_service.py     # Business logic
```

## Setup

### 1. Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and replace `your_openai_api_key_here` with your actual OpenAI API key.

### 4. Run the server

```bash
uvicorn main:app --reload
```

The server starts at `http://127.0.0.1:8000`.

API docs are available at `http://127.0.0.1:8000/docs`.

## Testing the Endpoint

### Using curl

```bash
curl -X POST http://127.0.0.1:8000/api/levels/introduction \
  -H "Content-Type: application/json" \
  -d '{
    "player_name": "Layla",
    "level_title": "Earthquake Safety",
    "level_description": "The player is inside a classroom when an earthquake suddenly starts. The player needs to learn how to stay safe by dropping, covering, and holding on.",
    "situation_type": "earthquake"
  }'
```

### Example Request Body

```json
{
  "player_name": "Layla",
  "level_title": "Earthquake Safety",
  "level_description": "The player is inside a classroom when an earthquake suddenly starts. The player needs to learn how to stay safe by dropping, covering, and holding on.",
  "situation_type": "earthquake"
}
```

### Example Response Body

```json
{
  "level_id": "earthquake_01",
  "assistant_name": "Youssef",
  "introduction_text": "Hi Layla! I am Youssef, your safety assistant. In this level, you are inside a classroom when an earthquake starts. Your goal is to stay calm, find a safe place, and learn how to protect yourself. Remember: drop, cover, and hold on!",
  "status": "success"
}
```

## Talk with YouSafe

Free conversation with YouSafe — supports text and voice, with multi-turn
history. History is **not** persisted server-side: Unity/the client sends the
full prior history with each request and stores the updated history that
comes back.

### Text endpoint — `POST /api/talk/text`

```bash
curl -X POST http://127.0.0.1:8000/api/talk/text \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "abc-123",
    "player_name": "Layla",
    "message": "كيف أتصرف لو شفت نار في المطبخ؟",
    "history": [],
    "level_context": null,
    "tts_enabled": true
  }'
```

Response:

```json
{
  "session_id": "abc-123",
  "player_message": "كيف أتصرف لو شفت نار في المطبخ؟",
  "assistant_text": "يا بطلة ليلى، ابتعدي عن النار وناديي ماما أو بابا فورًا.",
  "audio_base64": "<pcm_24000 audio, base64>",
  "history": [
    {"role": "user", "content": "كيف أتصرف لو شفت نار في المطبخ؟"},
    {"role": "assistant", "content": "يا بطلة ليلى، ..."}
  ],
  "status": "success"
}
```

For follow-up turns, send the returned `history` back as `history` in the
next request and append the new message. Set `tts_enabled: false` to skip
audio synthesis.

### Voice endpoint — `WebSocket /api/talk/voice`

Unity opens a WebSocket to `ws://<host>:<port>/api/talk/voice` and runs one
turn per utterance:

```text
1. → {"event":"start","session_id":"...","player_name":"...",
       "history":[...], "level_context":null, "tts_enabled":true}
   ← {"event":"connected"}

2. → {"event":"audio_chunk","audioBuffer":[...]}     (repeated)
   → {"event":"end_audio"}

3. ← {"event":"final_transcript","text":"..."}
   ← {"event":"assistant_text","text":"..."}
   ← {"event":"tts_audio_chunk","audio_base64":"...","is_final":false}
     (repeated)
   ← {"event":"tts_done"}
   ← {"event":"session_end"}
```

Errors arrive as `{"event":"error","detail":"..."}`. The first audio chunk
should include WAV headers, matching the existing `/api/voice/stt` proxy
convention.

## Deployment Notes

Do not commit real secrets to GitHub. Keep `.env` local only and add real
values in the cloud provider dashboards.

### Backend

Deploy the FastAPI backend to a platform that supports long-running ASGI apps
and WebSockets, such as Render, Railway, Fly.io, DigitalOcean App Platform,
AWS, or Azure App Service. Serverless-only backends are not a good fit for the
voice endpoints.

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Required backend environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
MUNSIT_API_KEY=your_munsit_api_key_here
MUNSIT_BASE_URL=https://api.munsit.com/api/v1
MUNSIT_STT_MODEL=munsit-en-ar
MUNSIT_TTS_MODEL=faseeh-v1-preview
MUNSIT_TTS_VOICE=ar-najdi-male-2
CORS_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com,http://localhost:5173,http://127.0.0.1:5173
```

`CORS_ALLOWED_ORIGINS` must contain the exact frontend origins that are allowed
to call the API and open WebSockets. In production, include your real HTTPS
domain names. Localhost origins are useful only for development.

### Frontend

Deploy the Vite app from the `website/` directory to Vercel, Netlify,
Cloudflare Pages, or another static hosting provider.

Frontend build environment variable:

```bash
VITE_API_BASE_URL=https://api.your-domain.com
```

When the frontend uses an HTTPS API URL, the Talk voice client automatically
opens `wss://` WebSocket connections. Local development with `http://localhost`
uses `ws://`.
