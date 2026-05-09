// Client for the "Talk with YouSafe" backend service.
//
// The backend lives in /app/routes/talk_routes.py and exposes:
//   POST /api/talk/text          — text in,  text + base64 audio out
//   POST /api/talk/voice         — audio file in, STT → AI → TTS audio out

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '');
const BASE_URL: string = configuredBaseUrl ?? (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '');

const apiBaseUrl = (): string => {
  if (!BASE_URL) {
    throw new Error('VITE_API_BASE_URL must be configured for production builds.');
  }
  return BASE_URL;
};

export type TalkRole = 'user' | 'assistant';

export type TalkMessage = {
  role: TalkRole;
  content: string;
};

export type LevelContext = {
  level_title?: string;
  situation_type?: string;
  level_description?: string;
};

export type TextTalkRequest = {
  session_id: string;
  player_name: string;
  message: string;
  history: TalkMessage[];
  level_context?: LevelContext | null;
  tts_enabled?: boolean;
};

export type TextTalkResponse = {
  session_id: string;
  player_message: string;
  assistant_text: string;
  audio_base64: string;
  history: TalkMessage[];
  status: string;
};

export const talkText = async (req: TextTalkRequest): Promise<TextTalkResponse> => {
  const res = await fetch(`${apiBaseUrl()}/api/talk/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...req,
      level_context: req.level_context ?? null,
      tts_enabled: req.tts_enabled ?? true,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Talk API ${res.status}: ${detail}`);
  }
  return res.json();
};

// ---- Voice (REST) ----

export type VoiceTalkResponse = {
  session_id: string;
  transcript: string;
  assistant_text: string;
  audio_base64: string;
  history: TalkMessage[];
  status: string;
};

export type VoiceTalkRequest = {
  audio: Blob;
  session_id: string;
  player_name: string;
  history: TalkMessage[];
  level_context?: LevelContext | null;
  tts_enabled?: boolean;
};

export const talkVoice = async (req: VoiceTalkRequest): Promise<VoiceTalkResponse> => {
  const form = new FormData();
  form.append('audio', req.audio, 'recording.wav');
  form.append('session_id', req.session_id);
  form.append('player_name', req.player_name);
  form.append('history', JSON.stringify(req.history));
  if (req.level_context) {
    form.append('level_context', JSON.stringify(req.level_context));
  }
  form.append('tts_enabled', String(req.tts_enabled ?? true));

  const res = await fetch(`${apiBaseUrl()}/api/talk/voice`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Talk Voice API ${res.status}: ${detail}`);
  }
  return res.json();
};
