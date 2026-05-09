import { ArrowRight } from 'lucide-react';
import { KineticHeading } from '../components/KineticHeading';
import type { SceneComponentProps } from '../types';

export const LevelPreviewScene = ({ active, reducedMotion, theme }: SceneComponentProps) => {
  return (
    <div className="relative grid h-full w-full grid-cols-1 gap-10 px-6 pb-10 pt-6 sm:px-12 lg:grid-cols-[1fr_1fr] lg:px-20">
      {/* ── Left: copy ── */}
      <div className="flex flex-col justify-center text-right">
        <span
          className={`kicker-label self-end ${active ? 'kinetic-fade' : 'opacity-0'}`}
          style={{ color: '#ffffff', animationDelay: '60ms' }}
        >
          {theme.kicker}
        </span>
        <h2 className="mt-4 font-black leading-[0.95] tracking-tight font-cartoon" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.4rem)' }}>
          <span className="block comic-text-shadow-sm" style={{ color: '#f0ede8' }}>
            <KineticHeading text="لإنو لعبة وحدة " active={active} reducedMotion={reducedMotion} startDelayMs={120} />
          </span>
          <span className="mt-2 block comic-text-shadow" style={{ color: theme.accent }}>
            <KineticHeading text=" ممكن تغير كل اشي " active={active} reducedMotion={reducedMotion} startDelayMs={400} />
          </span>
        </h2>

        <p
          className={`mt-7 max-w-xl self-end text-base leading-8 sm:text-lg font-cartoon ${active ? 'kinetic-rise' : 'opacity-0'}`}
          style={{ color: '#ffffff', animationDelay: '780ms' }}
        >
          خلّص التحديات، فكّ الألغاز، وافتح مراحل جديدة. كل غرفة بتعلّمك مهارة حقيقية بطريقة ممتعة وتفاعلية، وممكن مهارة وحدة في اللعبة تنقذ حياتك بعدين.
        </p>

        {/* Progress bar — game HP style */}
        <div className={`mt-10 ${active ? 'kinetic-rise' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-pixel text-[8px]" style={{ color: '#ffffff', letterSpacing: '0.1em', opacity: 0.85 }}>
              {active ? '78%' : '0%'}
            </span>
            <span className="font-pixel text-[8px]" style={{ color: '#ffffff', letterSpacing: '0.1em', opacity: 0.85 }}>
              LEVEL READY
            </span>
          </div>
          {/* Segmented HP bar */}
          <div
            className="flex gap-0.5"
            style={{ height: '12px' }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 transition-all duration-300"
                style={{
                  borderRadius: '1px',
                  background: active && i < 8
                    ? i < 6 ? theme.accent : `${theme.accent}88`
                    : 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(0,0,0,0.4)',
                  boxShadow: active && i < 6 ? `0 0 4px ${theme.accent}66` : 'none',
                  transitionDelay: `${i * 80 + 800}ms`,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 font-pixel text-[9px] uppercase tracking-widest transition hover:opacity-70"
            style={{ color: '#ffffff', letterSpacing: '0.14em', textShadow: '0 0 10px rgba(255,255,255,0.35)' }}
          >
            START LEVEL
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Visual: laptop with level floor plan on screen ── */}
      <div className="relative flex min-h-[min(340px,48vh)] items-center justify-center pb-6 lg:min-h-0 lg:pb-0">
        <div
          className={`pointer-events-none absolute inset-10 rounded-full blur-[52px] opacity-40 lg:inset-12 ${reducedMotion ? '' : 'blob-drift'}`}
          style={{ background: `radial-gradient(circle, ${theme.glow}, transparent 62%)` }}
        />

        <div
          className={`relative z-10 w-full max-w-[min(480px,92vw)] ${active ? 'kinetic-scale' : 'opacity-0'}`}
          style={{ animationDelay: '180ms' }}
        >
          <div className="flex justify-center" style={{ transform: 'rotate(-2.75deg)', transformOrigin: 'center center' }}>
            <img
              src="/level-preview-laptop-pixel.png"
              alt="لابتوب بكسل يعرض خريطة منزل داخل اللعبة"
              width={640}
              height={480}
              className="h-auto w-full select-none"
              style={{
                imageRendering: 'pixelated',
                filter: `drop-shadow(0 14px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 36px ${theme.glow})`,
              }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
