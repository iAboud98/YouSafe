import { ArrowDown, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KineticHeading } from '../components/KineticHeading';
import type { SceneComponentProps } from '../types';

const TICKER_CONTENT =
  'COMING SOON  ·  COMING SOON  ·  COMING SOON ·  COMING SOON  ·  COMING SOON  ·  COMING SOON  ·  COMING SOON ·  COMING SOON  ·  ';

const BADGES = [
  { text: 'POW!', color: '#00C8FF', bg: 'rgba(0,10,20,0.92)',  rotate: '-14deg', top: '8%',  side: 'right', sideVal: '0%', delay: '0s',    floatDelay: '0s' },
  { text: 'ZAP!', color: '#ffd700', bg: 'rgba(26,20,0,0.92)', rotate: '11deg',  top: '74%', side: 'right', sideVal: '0%', delay: '0.25s', floatDelay: '1.1s' },
  { text: 'WOW!', color: '#39ff14', bg: 'rgba(2,20,0,0.92)',  rotate: '-9deg',  top: '50%', side: 'left',  sideVal: '0%', delay: '0.5s',  floatDelay: '0.6s' },
];

export const HeroScene = ({ active, reducedMotion, theme, onNavigate }: SceneComponentProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxHeroRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const [punching, setPunching] = useState(false);
  const [showPow, setShowPow] = useState(false);
  const [imgSrc, setImgSrc] = useState('/hero-blast.png');

  useEffect(() => {
    if (!active || reducedMotion) return;
    let raf = 0;
    let targetX = 0, targetY = 0, curX = 0, curY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.07;
      curY += (targetY - curY) * 0.07;
      const heroEl = parallaxHeroRef.current;
      const textEl = parallaxTextRef.current;
      if (heroEl) heroEl.style.transform = `translate3d(${curX * 22}px, ${curY * 16}px, 0)`;
      if (textEl) textEl.style.transform = `translate3d(${curX * -10}px, ${curY * -8}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [active, reducedMotion]);

  const handleHeroPunch = useCallback(() => {
    if (punching) return;
    setPunching(true);
    setShowPow(true);
    setTimeout(() => setPunching(false), 700);
    setTimeout(() => setShowPow(false), 750);
  }, [punching]);

  return (
    <div
      ref={stageRef}
      className="relative flex h-full w-full flex-col overflow-hidden"
      dir="rtl"
    >
      {/* ── Ticker strip ── */}
      <div
        className="relative z-10 shrink-0 overflow-hidden ticker-shimmer"
        style={{
          height: '36px',
          background: `linear-gradient(90deg, rgba(2,14,28,0.92) 0%, ${theme.accent}44 50%, rgba(2,14,28,0.92) 100%)`,
          backdropFilter: 'blur(6px) saturate(140%)',
          WebkitBackdropFilter: 'blur(6px) saturate(140%)',
          borderBottom: `1px solid ${theme.accent}33`,
          boxShadow: `0 2px 0 ${theme.accent}22, 0 4px 12px rgba(0,0,0,0.10)`,
        }}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 8px ${theme.accent}`, marginLeft: '10px' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 8px ${theme.accent}`, marginRight: '10px' }} />
        <div className={`flex h-full items-center ${reducedMotion ? '' : 'ticker-scroll'}`} dir="ltr">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="font-pixel text-[7px] tracking-widest" style={{ color: '#ffffff', opacity: 0.88, padding: '0 2px', whiteSpace: 'nowrap' }}>
              {TICKER_CONTENT}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content row ── */}
      <div className="relative flex flex-1 min-h-0 flex-col-reverse lg:flex-row">

        {/* ── TEXT COLUMN ── */}
        <div
          ref={parallaxTextRef}
          className="relative z-10 flex flex-col justify-center gap-4 px-6 pt-8 pb-4 lg:w-[54%] lg:px-14 lg:pt-12 lg:pb-6"
          style={{ willChange: 'transform' }}
        >
          {/* New stronger slogan */}
          <h1 className="select-none text-right font-black leading-[0.95] tracking-tight font-display">
            <span
              className={`block text-[clamp(2.4rem,5.5vw,5rem)] ${active ? 'kinetic-rise' : 'opacity-0'}`}
              style={{
                color: '#202544',
                textShadow: '3px 3px 0 rgba(255,255,255,0.6), 4px 4px 0 rgba(0,0,0,0.15)',
                animationDelay: '160ms',
              }}
            >
              <KineticHeading text="تعلّم. قرّر." active={active} reducedMotion={reducedMotion} startDelayMs={180} />
            </span>
            <span
              className={`block text-[clamp(2.4rem,5.5vw,5rem)] ${active ? 'kinetic-rise' : 'opacity-0'}`}
              style={{
                color: theme.accent,
                textShadow: `3px 3px 0 rgba(255,255,255,0.7), 4px 4px 0 rgba(0,0,0,0.18), 0 0 30px ${theme.glow}`,
                animationDelay: '360ms',
              }}
            >
              <KineticHeading text="ابقَ آمناً دائماً!" active={active} reducedMotion={reducedMotion} startDelayMs={400} />
            </span>
          </h1>

          {/* Sub-headline */}
          <div className={`${active ? 'kinetic-rise' : 'opacity-0'}`} style={{ animationDelay: '620ms' }}>
            <p
              className="font-cartoon text-[clamp(0.95rem,1.7vw,1.25rem)] font-medium leading-relaxed text-right"
              style={{ color: '#ffffff', maxWidth: '500px', marginLeft: 'auto', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              مع يوسف، تعلّم كيف تتصرّف بأمان في مواقف الحياة اليومية.
            </p>
          </div>

          {/* Speech bubble — neon blue */}
          <div className={`${active ? 'kinetic-rise' : 'opacity-0'}`} style={{ animationDelay: '780ms' }}>
            <div
              className="relative inline-block w-full max-w-xl text-right"
              style={{
                background: theme.accent,
                border: '4px solid #000',
                padding: '14px 18px',
                color: '#001C2A',
                transform: 'skewX(-2deg)',
                boxShadow: `6px 6px 0 rgba(0,0,0,0.7), 0 0 26px ${theme.glow}`,
              }}
            >
              <div style={{ transform: 'skewX(2deg)' }}>
                <p
                  className="font-cartoon font-bold leading-snug"
                  style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', textShadow: '1px 1px 0 rgba(0,0,0,0.25)' }}
                >
                  مغامرات تفاعلية ممتعة تساعد الطفل على فهم الموقف واختيار التصرف الصحيح
                </p>
              </div>
              {/* Bubble tail */}
              <div className="absolute" style={{ bottom: '-18px', right: '36px', width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '0 solid transparent', borderTop: '20px solid #000' }} />
              <div className="absolute" style={{ bottom: '-12px', right: '40px', width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '0 solid transparent', borderTop: `15px solid ${theme.accent}` }} />
            </div>
          </div>

          {/* CTA buttons — only primary (removed "شاهد الفكرة") */}
          <div
            className={`flex flex-wrap items-center gap-3 justify-end ${active ? 'kinetic-rise' : 'opacity-0'}`}
            style={{ animationDelay: '960ms' }}
          >
            <button
              type="button"
              className="magnetic-cta inline-flex items-center justify-center gap-2 font-bold font-cartoon"
              style={{
                padding: '11px 24px',
                background: 'linear-gradient(180deg, #ffe033 0%, #ffb800 50%, #e6a800 100%)',
                border: '2px solid rgba(255,255,255,0.30)',
                boxShadow: '0 5px 0 #9a6e00, 0 6px 0 rgba(0,0,0,0.65), 0 0 28px rgba(255,215,0,0.55)',
                borderRadius: '4px',
                color: '#0d0800',
                fontSize: 'clamp(0.85rem,1.4vw,1rem)',
              }}
            >
              <Sparkles className="h-4 w-4" style={{ color: '#7a4e00' }} />
              ابدأ المغامرة
            </button>
          </div>

          {/* Scroll hint */}
          <div
            className={`flex justify-end ${active ? 'kinetic-fade' : 'opacity-0'}`}
            style={{ animationDelay: '1100ms' }}
          >
            <button
              type="button"
              onClick={() => onNavigate?.('about')}
              className="inline-flex items-center gap-2.5 font-cartoon text-xs font-bold uppercase tracking-[0.28em] transition-all"
              style={{
                padding: '8px 14px',
                color: 'rgba(32,37,68,0.85)',
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(32,37,68,0.22)',
                borderRadius: '2px',
                backdropFilter: 'blur(6px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#202544';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.75)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(32,37,68,0.85)';
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.55)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-sm"
                style={{ background: 'rgba(255,255,255,0.7)', border: `1px solid ${theme.accent}66` }}
              >
                <ArrowDown className={`h-3.5 w-3.5 ${reducedMotion ? '' : 'bounce-soft'}`} style={{ color: theme.accent }} />
              </span>
            </button>
          </div>
        </div>

        {/* ── HERO COLUMN ── */}
        <div
          className="relative flex shrink-0 items-center justify-center lg:w-[46%] px-8 py-6 lg:px-12"
          style={{ minHeight: '260px' }}
        >
          {!reducedMotion && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center starburst-spin" style={{ opacity: 0.10 }}>
              <div style={{
                width: 'min(420px, 80vw)', height: 'min(420px, 80vw)',
                background: `conic-gradient(from 0deg, ${theme.accent}00 0deg, ${theme.accent}cc 4deg, ${theme.accent}00 8deg, ${theme.accent}00 36deg, ${theme.accent}cc 40deg, ${theme.accent}00 44deg, ${theme.accent}00 72deg, ${theme.accent}cc 76deg, ${theme.accent}00 80deg, ${theme.accent}00 108deg, ${theme.accent}cc 112deg, ${theme.accent}00 116deg, ${theme.accent}00 144deg, ${theme.accent}cc 148deg, ${theme.accent}00 152deg, ${theme.accent}00 180deg, ${theme.accent}cc 184deg, ${theme.accent}00 188deg, ${theme.accent}00 216deg, ${theme.accent}cc 220deg, ${theme.accent}00 224deg, ${theme.accent}00 252deg, ${theme.accent}cc 256deg, ${theme.accent}00 260deg, ${theme.accent}00 288deg, ${theme.accent}cc 292deg, ${theme.accent}00 296deg, ${theme.accent}00 324deg, ${theme.accent}cc 328deg, ${theme.accent}00 332deg, ${theme.accent}00 360deg)`,
                borderRadius: '50%',
              }} />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 comic-halftone" style={{ opacity: 0.05 }} />

          {!reducedMotion && (
            <div className="pointer-events-none absolute rounded-full pulse-ring-1" style={{ width: 'min(340px, 68vw)', height: 'min(340px, 68vw)', border: `1px solid ${theme.accent}66` }} />
          )}

          {/* Action badges */}
          {BADGES.map((badge, i) => (
            <div
              key={i}
              className={`absolute z-20 pointer-events-none select-none ${active ? 'kinetic-pop' : 'opacity-0'} ${reducedMotion ? '' : 'badge-float'}`}
              style={{
                top: badge.top,
                [badge.side]: badge.sideVal,
                animationDelay: badge.delay,
                '--br': badge.rotate,
                ['--badge-float-delay' as string]: badge.floatDelay,
              } as React.CSSProperties}
            >
              <div
                className="font-comic font-bold flex items-center justify-center"
                style={{
                  padding: '4px 8px',
                  background: badge.bg,
                  color: badge.color,
                  border: `2px solid ${badge.color}`,
                  boxShadow: `3px 3px 0 rgba(0,0,0,0.75), 0 0 12px ${badge.color}55`,
                  borderRadius: '3px',
                  transform: `rotate(${badge.rotate})`,
                  fontSize: 'clamp(10px, 1.2vw, 13px)',
                  letterSpacing: '0.05em',
                  textShadow: `0 0 10px ${badge.color}`,
                  backdropFilter: 'blur(2px)',
                }}
              >
                {badge.text}
              </div>
            </div>
          ))}

          {/* Hero image with effects */}
          <div ref={parallaxHeroRef} className="relative z-10" style={{ willChange: 'transform' }}>
            <div className={`pointer-events-none absolute rounded-full blur-3xl ${reducedMotion ? '' : 'halo-glow'}`} style={{ inset: '-30px', background: `radial-gradient(circle, ${theme.glow}, transparent 65%)` }} />

            <div
              className={`relative cursor-pointer select-none ${active ? 'hero-entrance' : 'opacity-0'}`}
              style={{ animationDelay: '280ms' }}
              onClick={handleHeroPunch}
              onMouseEnter={(e) => {
                if (!punching) {
                  (e.currentTarget as HTMLDivElement).style.filter = `drop-shadow(0 0 40px ${theme.accent}88)`;
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)';
                  (e.currentTarget as HTMLDivElement).style.transition = 'transform 300ms cubic-bezier(0.34,1.56,0.64,1), filter 300ms ease';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter = '';
                (e.currentTarget as HTMLDivElement).style.transform = '';
                (e.currentTarget as HTMLDivElement).style.transition = 'transform 400ms cubic-bezier(0.34,1.56,0.64,1), filter 400ms ease';
              }}
            >
              <div className="relative" style={{ width: 'clamp(220px, 38vw, 420px)' }}>
                {/* Tilted frame behind */}
                <div
                  className={`pointer-events-none absolute inset-0 ${reducedMotion ? '' : 'card-tilt-sway'}`}
                  style={{ background: theme.accent, border: '8px solid #000', transform: 'rotate(3deg)', boxShadow: '6px 6px 0 rgba(0,0,0,0.55)' }}
                />
                {/* Main card */}
                <div
                  className="relative"
                  style={{ background: '#020D1A', border: '4px solid #000', padding: '14px', boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 32px ${theme.glow}` }}
                >
                  <img
                    src={imgSrc}
                    alt="بطل غزال YouSafe"
                    className={`relative block w-full h-auto ${reducedMotion ? '' : punching ? 'hero-punch' : 'float-medium'}`}
                    style={{ filter: `drop-shadow(0 12px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 22px ${theme.glow})`, imageRendering: 'auto' }}
                    onError={() => setImgSrc('/mascot.png')}
                    draggable={false}
                  />
                  {/* Scanlines overlay */}
                  <div className="pointer-events-none absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.14) 3px, rgba(0,0,0,0.14) 4px)', mixBlendMode: 'multiply' }} />
                  {showPow && (
                    <div className="pow-pop pointer-events-none absolute font-comic font-bold" style={{ top: '18%', left: '50%', fontSize: 'clamp(28px, 5vw, 48px)', color: '#ffd700', textShadow: '0 0 18px #ffd700, -2px -2px 0 #0a0008, 2px -2px 0 #0a0008, -2px 2px 0 #0a0008, 2px 2px 0 #0a0008', letterSpacing: '0.05em', zIndex: 30, whiteSpace: 'nowrap', transform: 'translate(-50%, -50%)' }}>
                      💥 POW!
                    </div>
                  )}
                </div>

                {/* "READY?" badge — neon blue */}
                <div className={`pointer-events-none absolute z-30 ${reducedMotion ? '' : 'badge-tilt-bob'}`} style={{ top: '-26px', right: '-26px', transform: 'rotate(12deg)' }}>
                  <div
                    className="font-comic font-bold text-center"
                    style={{ background: theme.accent, border: '4px solid #000', color: '#001C2A', padding: '8px 14px', boxShadow: `4px 4px 0 rgba(0,0,0,0.7), 0 0 18px ${theme.glow}`, lineHeight: 1 }}
                  >
                    <div style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', letterSpacing: '0.04em' }}>Are you</div>
                    <div className="font-pixel" style={{ fontSize: 'clamp(8px, 1.1vw, 10px)', letterSpacing: '0.18em', marginTop: '4px', opacity: 0.95 }}>READY?</div>
                  </div>
                </div>

                {/* Cyan pulsing square */}
                <div className={`pointer-events-none absolute z-20 ${reducedMotion ? '' : 'animate-pulse'}`} style={{ bottom: '-18px', left: '-18px', width: 'clamp(40px, 5vw, 64px)', height: 'clamp(40px, 5vw, 64px)', border: `4px solid ${theme.accent}`, background: `${theme.accent}08`, boxShadow: `0 0 18px ${theme.accent}, 3px 3px 0 rgba(0,0,0,0.6)` }} />

                {/* Yellow bouncing square */}
                <div className={`pointer-events-none absolute z-20 ${reducedMotion ? '' : 'square-bounce'}`} style={{ top: '50%', right: '-22px', width: 'clamp(36px, 4.5vw, 52px)', height: 'clamp(36px, 4.5vw, 52px)', background: '#FFD700', border: '4px solid #000', boxShadow: '4px 4px 0 rgba(0,0,0,0.7)', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {!punching && active && !reducedMotion && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[9px] font-bold tracking-widest pixel-blink pointer-events-none" style={{ color: '#ffffff', whiteSpace: 'nowrap', textShadow: '0 0 10px rgba(255,255,255,0.4)' }}>
                FIST BUMP
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
