import { Bot, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { KineticHeading } from '../components/KineticHeading';
import { PixelScrollArrows } from '../components/PixelScrollArrows';
import type { SceneComponentProps } from '../types';

const conversation = [
  { side: 'bot',  text: 'مرحبا انا يوسف، بدك مساعدة ؟' },
  { side: 'user', text: 'مش عارف شو اعمل بهاد الموقف ساعدني !' },
  { side: 'bot',  text: ' ما تخاف، انا هون ورح نحل كلشي سوا اول اشي خد نفس والحل كالآتي......' },
];

export const AssistantScene = ({ active, reducedMotion, theme, onNavigate }: SceneComponentProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) { setStep(0); return; }
    if (reducedMotion) { setStep(conversation.length); return; }
    setStep(0);
    const t1 = window.setTimeout(() => setStep(1), 800);
    const t2 = window.setTimeout(() => setStep(2), 1900);
    const t3 = window.setTimeout(() => setStep(3), 3000);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); window.clearTimeout(t3); };
  }, [active, reducedMotion]);

  return (
    <div className="assistant-scene relative grid h-full w-full grid-cols-1 gap-8 px-6 pb-10 pt-6 sm:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-20">

      {/* Subhi peeking — behind the chatbox */}
      <img
        src="/subhi-peek.png"
        alt="صبحي يطل"
        className="assistant-subhi-peek pointer-events-none absolute z-[1] transition-opacity duration-100"
        style={{
          left: '53.3%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          height: '200px',
          width: 'auto',
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
          opacity: active ? 1 : 0,
          transitionDelay: active ? '300ms' : '0ms',
        }}
        draggable={false}
      />

      {/* ── Left: copy ── */}
      <div className="assistant-copy flex flex-col justify-center text-right">
        <span
          className={`kicker-label self-end ${active ? 'kinetic-fade' : 'opacity-0'}`}
          style={{ color: '#ffffff', animationDelay: '60ms' }}
        >
          {theme.kicker}
        </span>
        <h2 className="assistant-heading mt-4 font-black leading-[0.95] tracking-tight font-cartoon" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)' }}>
          <span className="block comic-text-shadow-sm" style={{ color: '#f0ede8' }}>
            <KineticHeading text="مرشد هادئ" active={active} reducedMotion={reducedMotion} startDelayMs={120} />
          </span>
          <span className="mt-1 block comic-text-shadow" style={{ color: theme.accent }}>
            <KineticHeading text="وواضح دائمًا" active={active} reducedMotion={reducedMotion} startDelayMs={420} />
          </span>
        </h2>
        <p
          className={`assistant-description mt-7 text-base leading-8 sm:text-lg font-cartoon ${active ? 'kinetic-rise' : 'opacity-0'}`}
          style={{ color: '#ffffff', animationDelay: '780ms' }}
        >
          مساعد ذكي يجيب على أسئلة الطفل، يشرح المرحلة، ويوجّهه نحو القرار الآمن — بلغة عربية بسيطة ومشجّعة.
        </p>
      </div>

      {/* ── Right: CRT terminal chat ── */}
      <div className="assistant-chat-shell relative flex flex-col justify-center gap-3">
        <div
          className={`pointer-events-none absolute -top-8 right-0 h-72 w-72 rounded-full blur-3xl opacity-20 ${reducedMotion ? '' : 'blob-drift'}`}
          style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 60%)` }}
        />

        {/* ── AI POWERED badge — above the chatbox ── */}
        <div
          className={`assistant-ai-badge flex items-center justify-end gap-2 ${active ? 'kinetic-fade' : 'opacity-0'}`}
          style={{ animationDelay: '300ms' }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5"
            style={{
              background: `${theme.accent}12`,
              border: `1px solid ${theme.accent}44`,
              borderRadius: '3px',
              boxShadow: `0 0 12px ${theme.accent}22`,
            }}
          >
            <Cpu className="h-3 w-3" style={{ color: theme.accent }} />
            <span
              className="font-pixel uppercase"
              style={{ fontSize: '7px', color: theme.accent, letterSpacing: '0.14em', textShadow: `0 0 8px ${theme.accent}88` }}
            >
              AI POWERED
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${reducedMotion ? '' : 'animate-pulse'}`}
              style={{ background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}
            />
          </div>
        </div>

        {/* CRT monitor frame */}
        <div
          className={`assistant-terminal relative z-10 overflow-hidden scanlines ${active ? 'kinetic-rise' : 'opacity-0'}`}
          dir="rtl"
          style={{
            animationDelay: '0ms',
            background: 'rgba(1, 6, 14, 0.97)',
            border: `2px solid ${theme.accent}77`,
            boxShadow: `0 0 0 1px rgba(0,0,0,0.95), 4px 4px 0 rgba(0,0,0,0.7), 0 0 28px ${theme.glow}`,
            borderRadius: '3px',
          }}
        >
          {/* Pixel corner accents */}
          <div className="pointer-events-none absolute left-0 top-0 z-[6]" style={{ width: 12, height: 12, borderTop: `3px solid ${theme.accent}`, borderLeft: `3px solid ${theme.accent}` }} />
          <div className="pointer-events-none absolute right-0 top-0 z-[6]" style={{ width: 12, height: 12, borderTop: `3px solid ${theme.accent}`, borderRight: `3px solid ${theme.accent}` }} />
          <div className="pointer-events-none absolute bottom-0 left-0 z-[6]" style={{ width: 12, height: 12, borderBottom: `3px solid ${theme.accent}`, borderLeft: `3px solid ${theme.accent}` }} />
          <div className="pointer-events-none absolute bottom-0 right-0 z-[6]" style={{ width: 12, height: 12, borderBottom: `3px solid ${theme.accent}`, borderRight: `3px solid ${theme.accent}` }} />

          {/* Terminal title bar */}
          <div
            className="assistant-title-bar flex items-center gap-2 border-b px-3 py-2"
            style={{ borderColor: `${theme.accent}33`, background: `${theme.accent}08` }}
          >
            <div className={`flex items-center gap-1.5 ${active ? 'kinetic-fade' : 'opacity-0'}`} style={{ animationDelay: '260ms' }}>
              <div
                className="flex h-9 w-9 items-center justify-center"
                style={{ background: `${theme.accent}1a`, border: `1px solid ${theme.accent}44`, borderRadius: '2px' }}
              >
                <Bot className="h-4 w-4" style={{ color: theme.accent }} />
              </div>
              <div>
                <p className="font-pixel text-[8px]" style={{ color: '#ffffff', letterSpacing: '0.08em' }}>YOUSAFE</p>
                <p className="font-pixel text-[6px]" style={{ color: '#ffffff', letterSpacing: '0.1em', opacity: 0.88 }}>ONLINE ●</p>
              </div>
            </div>
            {/* Window controls */}
            <div className="mr-auto flex items-center gap-1" dir="ltr">
              {[`${theme.accent}`, '#ffd700', '#39ff14'].map((c, i) => (
                <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: c, opacity: 0.75, border: '1px solid rgba(0,0,0,0.4)' }} />
              ))}
            </div>
          </div>

          {/* Pixel grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,200,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.025) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Chat area */}
          <div className="assistant-chat-area relative z-[2] space-y-3 p-4" dir="rtl">
            {conversation.map((msg, i) => {
              const visible = step > i;
              const isBot = msg.side === 'bot';
              return (
                <div
                  key={i}
                  className={`flex items-end gap-2.5 ${isBot ? 'justify-start' : 'justify-end'} transition-all duration-700`}
                  style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
                >
                  {isBot && (
                    <div
                      className="assistant-chat-avatar relative h-11 w-11 shrink-0 overflow-hidden sm:h-12 sm:w-12"
                      style={{
                        borderRadius: '3px',
                        border: `2px solid ${theme.accent}77`,
                        boxShadow: `0 0 0 1px rgba(0,0,0,0.9), 0 2px 0 rgba(0,0,0,0.6), 0 0 12px ${theme.glow}`,
                        background: 'rgba(1,6,14,0.9)',
                      }}
                    >
                      <img
                        src="/image%20copy%202.png"
                        alt="يوسف — YouSafe"
                        width={96}
                        height={96}
                        className="h-full w-full object-cover object-top"
                        draggable={false}
                      />
                    </div>
                  )}
                  <div
                    className="assistant-message max-w-[min(100%,18rem)] px-4 py-2.5 text-sm leading-7 sm:max-w-[80%]"
                    style={isBot
                      ? {
                          background: `${theme.accent}0d`,
                          border: `1px solid ${theme.accent}2a`,
                          borderRadius: '2px 3px 3px 0',
                          color: '#ffffff',
                          fontFamily: 'Fredoka, Cairo, sans-serif',
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03)`,
                        }
                      : {
                          background: `rgba(255,255,255,0.06)`,
                          border: `1px solid rgba(255,255,255,0.12)`,
                          borderRadius: '3px 2px 0 3px',
                          color: '#ffffff',
                          fontFamily: 'Fredoka, Cairo, sans-serif',
                        }
                    }
                  >
                    {isBot && (
                      <span className="font-pixel mb-1 block text-[7px]" style={{ color: '#ffffff', opacity: 0.65 }}>
                        YOUSAFE &gt;
                      </span>
                    )}
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {step > 0 && step < conversation.length && (
              <div className="flex items-center gap-1.5" style={{ color: '#ffffff' }}>
                <span className="typing-dot" />
                <span className="typing-dot typing-dot-delay-1" />
                <span className="typing-dot typing-dot-delay-2" />
                <span className="font-pixel text-[7px] mr-2 opacity-55" style={{ letterSpacing: '0.1em' }}>PROCESSING</span>
              </div>
            )}
          </div>

          {/* Bottom terminal prompt */}
          <div
            className="assistant-terminal-prompt relative z-[2] flex items-center gap-2 border-t px-3 py-2"
            style={{ borderColor: `${theme.accent}18` }}
          >
            <span className="font-pixel text-[7px]" style={{ color: '#ffffff', opacity: 0.55 }}>&gt;_</span>
            <div className="h-2 w-16 pixel-blink" style={{ background: `${theme.accent}44`, borderRadius: '1px' }} />
          </div>
        </div>
      </div>
      <PixelScrollArrows accent={theme.accent} active={active} reducedMotion={reducedMotion} onClick={() => onNavigate?.('scenarios')} />
    </div>
  );
};
