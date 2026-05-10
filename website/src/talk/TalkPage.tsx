import { ArrowLeft, ArrowUp, Mic, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CinematicBackdrop } from '../home/components/CinematicBackdrop';
import { useReducedMotion } from '../home/hooks/useReducedMotion';
import type { SceneTheme } from '../home/types';
import { talkText, talkVoice, type TalkMessage } from './api';
import { MicRecorder, playBase64Audio, unlockAudioContext } from './audio';

type TalkPageProps = {
  onBack: () => void;
};

type Mode = 'text' | 'voice';

const DEFAULT_RESPONSE = 'مرحبا، أنا يوسف كيف يمكنني مساعدتك؟';

const newSessionId = (): string =>
  `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const PLAYER_NAME = 'صديقي';

const TALK_SCENE_THEME: SceneTheme = {
  backdrop: 'linear-gradient(155deg, #0a0512 0%, #08040f 40%, #070310 100%)',
  curtain: '#bf5fff',
  accent: '#bf5fff',
  glow: 'rgba(191,95,255,0.5)',
  kicker: 'YOUSAFE',
};

const UI = {
  text: '#f0ede8',
  gold: '#f7c948',
} as const;

const isSafariBrowser = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/(Chrome|Chromium|CriOS|Edg|OPR)/.test(ua);
};

const isIOSDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

function MascotStage({ speaking }: { reducedMotion: boolean; speaking: boolean }) {
  const { accent, glow } = TALK_SCENE_THEME;
  const isSafari = isSafariBrowser();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isSafari) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (!speaking) {
      v.pause();
      v.currentTime = 0;
    } else {
      void v.play().catch(() => {});
    }
  }, [isSafari, speaking]);

  return (
    <div
      className="relative mx-auto aspect-square w-[min(76vw,300px)] sm:w-[min(70vw,340px)] md:w-[min(56vw,380px)]"
      style={{ maxHeight: 'min(48vh, 400px)' }}
    >
      <div
        className="pointer-events-none absolute inset-[8%] rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-[10%] rounded-full opacity-50 comic-radial-burst spin-slow"
        style={{ filter: 'blur(0.5px)' }}
      />
      <div
        className="absolute inset-[12%] rounded-full border-4 border-dashed opacity-40 spin-slower-reverse"
        style={{ borderColor: accent }}
      />
      {isSafari ? (
        <img
          src="/mascot.png"
          alt="بطل غزال يوسف"
          className="absolute left-1/2 top-1/2 z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[8px_12px_0_rgba(0,0,0,0.82)] float-medium"
          draggable={false}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[8px_12px_0_rgba(0,0,0,0.82)] float-medium"
          loop
          muted
          playsInline
          preload="auto"
          poster="/mascot.png"
          aria-label="بطل غزال يوسف — فيديو"
        >
          <source src="/Gazal_talking.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
}

const BAR_COUNT = 40;

const VoiceWaves = () => {
  const { accent, glow } = TALK_SCENE_THEME;
  const [elapsed, setElapsed] = useState(0);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    let frame: number;
    const animate = () => {
      const now = performance.now() / 1000;
      const bars = el.children;
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i] as HTMLElement;
        const speed = 2.5 + (i % 5) * 0.6;
        const phase = i * 0.35;
        const h = 18 + Math.abs(Math.sin(now * speed + phase)) * 82;
        bar.style.height = `${h}%`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <div
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 sm:gap-4 sm:px-5 sm:py-4"
      style={{
        background: 'rgba(4, 8, 18, 0.88)',
        border: `1px solid ${accent}44`,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.9), 4px 4px 0 rgba(0,0,0,0.65), 0 0 28px ${glow}`,
      }}
    >
      {/* Pulsing red dot */}
      <span className="relative flex h-3.5 w-3.5 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
          style={{ animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite' }}
        />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500" style={{ boxShadow: '0 0 8px rgba(239,68,68,0.7)' }} />
      </span>

      {/* Timer */}
      <span
        className="shrink-0 font-mono text-sm font-bold tabular-nums sm:text-base"
        dir="ltr"
        style={{ color: UI.text, minWidth: '3.2em' }}
      >
        {mm}:{ss}
      </span>

      {/* Waveform bars */}
      <div
        ref={barsRef}
        className="flex flex-1 items-center justify-center gap-[2px] sm:gap-[3px]"
        style={{ height: '44px' }}
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: '3px',
              height: '18%',
              background: i % 3 === 0 ? accent : i % 3 === 1 ? UI.gold : '#e879f9',
              opacity: 0.85,
              transition: 'height 80ms ease-out',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Voice state: 'idle' → 'recording' → 'sending' → 'idle'
type VoiceState = 'idle' | 'recording' | 'sending';

export const TalkPage = ({ onBack }: TalkPageProps) => {
  const reducedMotion = useReducedMotion();
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('text');
  const [responseText, setResponseText] = useState(DEFAULT_RESPONSE);
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const { accent, glow } = TALK_SCENE_THEME;

  const audioCallbacks = {
    onStart: () => setSpeaking(true),
    onEnd: () => setSpeaking(false),
  };

  const sessionIdRef = useRef<string>(newSessionId());
  const historyRef = useRef<TalkMessage[]>([]);
  const recorderRef = useRef<MicRecorder | null>(null);

  // ---- Text send ----
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudioContext();
    const message = input.trim();
    if (!message || busy) return;
    setBusy(true);
    setInput('');
    try {
      const res = await talkText({
        session_id: sessionIdRef.current,
        player_name: PLAYER_NAME,
        message,
        history: historyRef.current,
        tts_enabled: true,
      });
      historyRef.current = res.history;
      setResponseText(res.assistant_text);
      if (res.audio_base64) {
        playBase64Audio(res.audio_base64, audioCallbacks).catch(() => {});
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setResponseText(`عذرًا، صار في مشكلة بالاتصال: ${msg}`);
    } finally {
      setBusy(false);
    }
  };

  // ---- Voice: start recording ----
  const startRecording = async () => {
    unlockAudioContext();
    setMode('voice');
    setVoiceState('recording');
    setBusy(true);
    setResponseText('يوسف يستمع لك...');

    try {
      const rec = new MicRecorder();
      recorderRef.current = rec;
      await rec.start();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setResponseText(`عذرًا، ما قدرت أفتح المايك: ${msg}`);
      setVoiceState('idle');
      setBusy(false);
      setMode('text');
    }
  };

  // ---- Voice: stop recording + send to backend ----
  const stopAndSend = async () => {
    if (voiceState !== 'recording') return;

    const rec = recorderRef.current;
    if (!rec) {
      setVoiceState('idle');
      setBusy(false);
      setMode('text');
      return;
    }

    const wavBlob = rec.getWavBlob();
    recorderRef.current = null;
    await rec.stop();

    if (wavBlob.size < 5000) {
      setResponseText('لم يتم التعرف على صوت، حاول مرة ثانية');
      setVoiceState('idle');
      setBusy(false);
      setMode('text');
      return;
    }

    setVoiceState('sending');
    setResponseText('يوسف يفكر...');

    try {
      const res = await talkVoice({
        audio: wavBlob,
        session_id: sessionIdRef.current,
        player_name: PLAYER_NAME,
        history: historyRef.current,
        tts_enabled: true,
      });
      historyRef.current = res.history;
      setResponseText(res.assistant_text);
      if (res.audio_base64) {
        playBase64Audio(res.audio_base64, audioCallbacks).catch(() => {});
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setResponseText(`عذرًا، صار في مشكلة بالاتصال: ${msg}`);
    } finally {
      setVoiceState('idle');
      setBusy(false);
      setMode('text');
    }
  };

  // ---- Voice: cancel without sending ----
  const cancelRecording = async () => {
    const rec = recorderRef.current;
    recorderRef.current = null;
    try { await rec?.stop(); } catch { /* ignore */ }
    setVoiceState('idle');
    setBusy(false);
    setMode('text');
    setResponseText(DEFAULT_RESPONSE);
  };

  // Cleanup on unmount
  useEffect(() => () => {
    const rec = recorderRef.current;
    recorderRef.current = null;
    rec?.stop().catch(() => {});
  }, []);

  const accentMuted = `${accent}2e`;
  const accentSoft = `${accent}38`;

  return (
    <main dir="rtl" className="relative flex h-full max-h-full min-h-0 flex-1 flex-col overflow-hidden" style={{ color: UI.text }}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <CinematicBackdrop theme={TALK_SCENE_THEME} reducedMotion={reducedMotion} showWallpaper />
      </div>

      <header className="relative z-30 px-4 pt-3 sm:px-8">
        <div
          className="mx-auto flex w-full max-w-[1680px] items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3"
          style={{
            background: 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: `1px solid ${accentMuted}`,
            borderRadius: '12px',
            boxShadow: `0 6px 22px ${accentSoft}, inset 0 1px 0 rgba(0, 0, 0, 0.45)`,
          }}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <img src="/New_Logo.png" alt="YouSafe" className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12" />
            <div className="min-w-0 text-right">
              <p
                className="font-pixel uppercase leading-none"
                style={{
                  fontSize: 'clamp(7px, 1.5vw, 9px)',
                  letterSpacing: '0.2em',
                  color: accent,
                  textShadow: `0 0 10px ${glow}`,
                }}
              >
                {TALK_SCENE_THEME.kicker}
              </p>
              <p className="font-cartoon mt-0.5 text-sm font-extrabold text-white sm:text-base">احكي مع يوسف</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              void cancelRecording();
              onBack();
            }}
            aria-label="ارجع للرئيسية"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:-rotate-6 hover:scale-105 sm:h-14 sm:w-14"
            style={{
              background: `${accent}16`,
              borderColor: `${accent}77`,
              boxShadow: `0 0 0 1px rgba(0,0,0,0.85), 3px 3px 0 rgba(0,0,0,0.6), 0 0 16px ${glow}`,
            }}
          >
            <ArrowLeft className="h-6 w-6 -scale-x-100 text-white sm:h-7 sm:w-7" />
          </button>
        </div>
      </header>

      <div className="relative z-20 mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col px-4 pb-6 pt-3 sm:max-w-xl sm:px-6 sm:pb-8 sm:pt-4">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 sm:gap-3">
          <div className="kinetic-rise w-full shrink-0" style={{ animationDelay: '80ms' }}>
            <MascotStage reducedMotion={reducedMotion} speaking={isIOSDevice() ? false : speaking} />
          </div>
          <p
            dir="rtl"
            className="kinetic-rise max-w-[28ch] px-2 text-center font-cartoon text-lg font-extrabold leading-snug text-white sm:text-xl"
            style={{
              animationDelay: '160ms',
              textShadow: `0 0 18px ${glow}, 0 2px 4px rgba(0,0,0,0.85)`,
            }}
          >
            {responseText}
          </p>
        </div>

        <div className="mt-4 w-full shrink-0 sm:mt-5">
          {mode === 'text' ? (
            <form
              onSubmit={handleSend}
              className="flex w-full items-center gap-3 rounded-full p-3 backdrop-blur sm:gap-4 sm:p-4 comic-border kinetic-rise"
              style={{
                animationDelay: '240ms',
                background: 'rgba(6, 10, 20, 0.88)',
                borderColor: `${accent}44`,
                boxShadow: `0 0 0 1px rgba(0,0,0,0.9), 4px 4px 0 rgba(0,0,0,0.65), 0 0 26px ${accent}28`,
              }}
            >
              <button
                type="button"
                onClick={() => void startRecording()}
                disabled={busy}
                aria-label="ابدأ وضع الصوت"
                className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full transition-transform hover:-rotate-6 hover:scale-105 disabled:opacity-60 sm:h-[68px] sm:w-[68px] comic-border-sm"
                style={{
                  background: `linear-gradient(145deg, ${accent} 0%, color-mix(in srgb, ${accent} 72%, #000) 100%)`,
                  borderColor: `${accent}88`,
                  boxShadow: `0 0 18px ${glow}, 3px 3px 0 rgba(0,0,0,0.65)`,
                }}
              >
                <Mic className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك ليوسف..."
                dir="rtl"
                disabled={busy}
                className="min-h-[52px] flex-1 bg-transparent px-2 py-2 text-right font-cartoon text-base font-medium placeholder:text-[rgba(240,237,232,0.55)] focus:outline-none disabled:opacity-60 sm:min-h-[60px] sm:px-3 sm:text-lg"
                style={{ color: UI.text }}
              />

              <button
                type="submit"
                aria-label="إرسال"
                disabled={busy || !input.trim()}
                className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full transition-transform hover:-rotate-6 hover:scale-105 disabled:opacity-60 sm:h-[68px] sm:w-[68px] comic-border-sm"
                style={{
                  background: `linear-gradient(145deg, ${UI.gold} 0%, color-mix(in srgb, ${UI.gold} 65%, #3d2a00) 100%)`,
                  borderColor: `${UI.gold}aa`,
                  boxShadow: `0 0 16px rgba(247,201,72,0.35), 3px 3px 0 rgba(0,0,0,0.65)`,
                }}
              >
                <ArrowUp className="h-6 w-6 text-[#1a0f00] sm:h-8 sm:w-8" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-stretch gap-3 kinetic-rise sm:gap-4" style={{ animationDelay: '120ms' }}>
              {voiceState === 'recording' ? (
                <>
                  <VoiceWaves />
                  <div className="mx-auto flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => void stopAndSend()}
                      aria-label="أرسل التسجيل"
                      className="flex items-center gap-2 rounded-full px-6 py-3 font-cartoon text-base font-extrabold transition-transform hover:-rotate-2 hover:scale-105 sm:text-lg comic-border-sm"
                      style={{
                        background: `linear-gradient(145deg, ${UI.gold} 0%, color-mix(in srgb, ${UI.gold} 65%, #3d2a00) 100%)`,
                        borderColor: `${UI.gold}aa`,
                        color: '#1a0f00',
                        boxShadow: `0 0 16px rgba(247,201,72,0.35), 3px 3px 0 rgba(0,0,0,0.65)`,
                      }}
                    >
                      <ArrowUp className="h-5 w-5" />
                      إرسال
                    </button>
                    <button
                      type="button"
                      onClick={() => void cancelRecording()}
                      aria-label="إلغاء التسجيل"
                      className="flex items-center gap-2 rounded-full px-5 py-3 font-cartoon text-base font-extrabold transition-transform hover:-rotate-2 hover:scale-105 sm:text-lg comic-border-sm"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: UI.text,
                        boxShadow: '3px 3px 0 rgba(0,0,0,0.65)',
                      }}
                    >
                      <X className="h-5 w-5" />
                      إلغاء
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full border-4 border-t-transparent"
                    style={{
                      borderColor: `${accent} transparent ${accent} ${accent}`,
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  <p className="font-cartoon text-base font-extrabold" style={{ color: UI.text }}>
                    يوسف يفكر...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
