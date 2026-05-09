import { ArrowLeft, Mail} from 'lucide-react';
import { KineticHeading } from '../components/KineticHeading';
import type { SceneComponentProps } from '../types';

export const FinalCTAWithFooterScene = ({ active, reducedMotion, theme, onNavigate }: SceneComponentProps) => {
  /** White copy with purple neon highlight (matches stage accent). */
  const purpleGlow = theme.glow;
  const purple = theme.accent;
  const textWhitePurple = {
    color: '#ffffff' as const,
    textShadow: `0 0 18px ${purpleGlow}, 0 0 34px ${purple}40, 0 1px 0 rgba(0,0,0,0.9)`,
  };
  const headlinePurple = {
    color: '#ffffff' as const,
    textShadow: `0 0 22px ${purpleGlow}, 0 0 48px ${purple}50, 2px 2px 0 rgba(0,0,0,0.88), -1px -1px 0 rgba(0,0,0,0.35)`,
  };

  return (
    <div className="relative grid h-full max-h-full min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden px-4 pb-4 pt-4 sm:px-8 sm:pb-5 sm:pt-5 lg:px-16 lg:pb-6 lg:pt-6">
      {/* ── Hero finale — sized to fit 100% zoom (nav + backdrop + footer) ── */}
      <div className="relative grid min-h-0 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(min(440px,100%),1.35fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(min(460px,100%),1.45fr)]" dir="ltr">
        {/* Explicit left column: phone artwork */}
        <div className="relative flex min-h-0 min-w-0 items-end justify-center pb-2 lg:max-h-[min(82svh,820px)] lg:justify-start lg:pb-0">
          <div
            className={`pointer-events-none absolute inset-2 rounded-full blur-3xl opacity-35 sm:inset-4 lg:inset-6 ${reducedMotion ? '' : 'blob-drift'}`}
            style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 60%)` }}
          />
          <div
            className={`relative z-10 w-full ${active ? 'kinetic-scale' : 'opacity-0'}`}
            style={{ animationDelay: reducedMotion ? '0ms' : '180ms' }}
          >
            <img
              src="/cta-yousafe-phone.png"
              alt="تطبيق YouSafe كما يظهر في متجر التطبيقات على هاتف"
              width={900}
              height={1280}
              className={`mx-auto h-auto max-h-[min(58svh,520px)] w-auto max-w-[min(94vw,28rem)] object-contain object-bottom drop-shadow-[0_28px_56px_rgba(0,0,0,0.82)] sm:max-h-[min(64svh,600px)] sm:max-w-[32rem] md:max-h-[min(70svh,680px)] md:max-w-[36rem] lg:mx-0 lg:max-h-[min(76svh,760px)] lg:max-w-[min(60vw,44rem)] xl:max-h-[min(82svh,840px)] xl:max-w-[min(62vw,48rem)] ${
                reducedMotion ? '' : 'float-medium'
              }`}
              style={{
                filter: `drop-shadow(0 0 32px ${theme.glow})`,
                imageRendering: 'auto',
              }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>

        <div dir="rtl" className="flex min-w-0 flex-col items-center justify-center px-2 text-center sm:px-4 lg:min-h-[min(70svh,640px)] lg:px-6 lg:py-4 xl:min-h-[min(72svh,680px)]">
          {/* INSERT COIN prompt */}
          <div
            className={`mb-3 ${active ? 'kinetic-fade' : 'opacity-0'}`}
            style={{ animationDelay: '60ms' }}
          >
            <span
              className="font-pixel text-[9px] pixel-blink"
              style={{
                ...textWhitePurple,
                letterSpacing: '0.16em',
                textShadow: `0 0 14px ${purpleGlow}, 0 0 24px ${purple}55, 0 1px 0 rgba(0,0,0,0.95)`,
              }}
            >
              ▶ INSERT COIN
            </span>
          </div>

          <h2
            className="mx-auto max-w-[22ch] font-black leading-[1.05] tracking-tight font-cartoon sm:max-w-[26ch]"
            style={{ fontSize: 'clamp(2rem, 3.75vw + 0.85rem, 4.35rem)' }}
          >
            <span className="block" style={headlinePurple}>
              <KineticHeading text="ابدأ" active={active} reducedMotion={reducedMotion} startDelayMs={120} />
            </span>
            <span className="mt-1 block" style={headlinePurple}>
              <KineticHeading text="مغامرة YouSafe!" active={active} reducedMotion={reducedMotion} startDelayMs={380} />
            </span>
          </h2>

          <p
            className={`mx-auto mt-5 max-w-md text-base leading-relaxed sm:max-w-lg sm:text-[1.06rem] sm:leading-8 font-cartoon md:max-w-2xl ${active ? 'kinetic-rise' : 'opacity-0'}`}
            style={{ ...textWhitePurple, animationDelay: '780ms' }}
          >
            رحلة ممتعة يتعلّم فيها الطفل مهارات السلامة من خلال اللعب والمواقف التفاعلية والإرشاد الذكي.
          </p>

          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-4 ${active ? 'kinetic-rise' : 'opacity-0'}`}
            style={{ animationDelay: '950ms' }}
          >
            {/* GAME START button */}
            <button
              type="button"
              className="magnetic-cta inline-flex items-center justify-center px-7 py-3 font-cartoon text-sm font-bold transition-all sm:px-9 sm:text-base sm:py-3.5"
              style={{
                background: 'linear-gradient(180deg, rgba(12,4,22,0.92) 0%, rgba(6,2,14,0.96) 100%)',
                color: '#ffffff',
                border: `2px solid ${purple}`,
                boxShadow: `0 4px 0 rgba(0,0,0,0.65), 0 0 28px ${purpleGlow}, 0 0 44px ${purple}35, inset 0 1px 0 rgba(255,255,255,0.08)`,
                borderRadius: '3px',
                textShadow: `0 0 12px ${purpleGlow}`,
              }}
            >
              ابدأ الآن!
            </button>
            {/* Back button */}
            <button
              type="button"
              onClick={() => onNavigate?.('home')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 font-cartoon text-sm font-bold transition-all hover:brightness-110 sm:px-6 sm:py-3.5 sm:text-base"
              style={{
                background: 'rgba(8,3,16,0.55)',
                border: `2px solid ${purple}99`,
                color: '#ffffff',
                borderRadius: '3px',
                boxShadow: `3px 3px 0 rgba(0,0,0,0.55), 0 0 18px ${purpleGlow}`,
                textShadow: `0 0 10px ${purple}45`,
              }}
            >
              <ArrowLeft className="h-4 w-4" style={{ filter: `drop-shadow(0 0 6px ${purple})` }} />
              ارجع للأعلى
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer — arcade cabinet credits ── */}
      <footer className="relative z-10 shrink-0 pt-3 text-right" style={{ borderTop: `1px solid ${theme.accent}22` }}>
        {/* Top neon line */}
        <div className="mb-2 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}44, transparent)` }} />

        <div className="grid gap-4 items-center lg:grid-cols-[minmax(auto,1fr)_minmax(auto,1fr)_minmax(auto,1fr)]">
          <div className="flex items-center justify-start gap-3">
            <div className="text-left">
              <p className="font-cartoon text-[11px] font-bold" style={{ ...textWhitePurple, letterSpacing: '0.1em' }}>YOUSAFE</p>
              <p
                className="font-cartoon text-[9px] mt-1"
                style={{
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  opacity: 0.95,
                  textShadow: `0 0 12px ${purpleGlow}, 0 1px 0 rgba(0,0,0,0.85)`,
                }}
              >
                © 2026 ALL RIGHTS RESERVED
              </p>
            </div>
            <img
              src="/New_Logo.png"
              alt="شعار YouSafe"
              className="h-10 w-auto"
              style={{ filter: `drop-shadow(0 0 6px ${theme.glow})` }}
            />
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-3 font-cartoon text-[9px]"
            style={{
              color: '#ffffff',
              letterSpacing: '0.1em',
              opacity: 0.95,
              textShadow: `0 0 14px ${purpleGlow}, 0 1px 0 rgba(0,0,0,0.88)`,
            }}
          >
            <span>HOME</span><span>·</span><span>ABOUT</span><span>·</span><span>JOURNEY</span><span>·</span><span>AI</span>
          </div>

          <div className="flex items-center justify-end">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-[0.82rem] font-bold font-cartoon"
              style={{
                background: `${purple}12`,
                border: `1px solid ${purple}77`,
                color: '#ffffff',
                borderRadius: '999px',
                boxShadow: `0 0 20px ${purpleGlow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                textShadow: `0 0 10px ${purple}40`,
              }}
            >
              <Mail className="h-4 w-4" style={{ color: '#ffffff', filter: `drop-shadow(0 0 5px ${purple})` }} />
              yousafe1402@gmail.com
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
