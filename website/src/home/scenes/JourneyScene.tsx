import { Check, Eye, Gamepad2, MapPinned, Shield } from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { KineticHeading } from '../components/KineticHeading';
import type { SceneComponentProps } from '../types';

const steps = [
  { icon: MapPinned, title: 'اختر المرحلة', text: 'ابدأ من مهمة مناسبة وتعرّف على الفكرة.' },
  { icon: Eye, title: 'افهم الموقف', text: 'شاهد القصة وحدد ما الذي يحدث حولك.' },
  { icon: Gamepad2, title: 'اتخذ القرار', text: 'اختر بدقة وجرّب النتيجة في بيئة آمنة.' },
  { icon: Shield, title: 'تعلّم التصرف الآمن', text: 'احفظ الخطوة الصحيحة وكررها بثقة.' },
];

const BEAT_MS = 2000;
const ROADMAP_RING_PX = '5.75rem';
/** Vertical offset from column top to ring center (label + gap after label + half ring). Includes ROADMAP_RING_LIFT. */
const ROADMAP_RING_LIFT = '0.75rem';
/** `3.5rem` = stage label row (`h-14`); `0.75rem` = `mb-3` under label; `2.875rem` = half ring (`5.75rem`/2). */
const ROADMAP_CONNECTOR_TOP = `calc(3.5rem + 0.75rem - ${ROADMAP_RING_LIFT} + 2.875rem - 1px)`;

function JourneyPointsReveal({
  amount,
  reducedMotion,
  suffix = 'points',
  className,
}: {
  amount: number;
  reducedMotion: boolean;
  suffix?: 'points' | 'total';
  className?: string;
}) {
  const [n, setN] = useState(reducedMotion ? amount : 0);

  useEffect(() => {
    if (reducedMotion) { setN(amount); return; }
    setN(0);
    const start = performance.now();
    const duration = Math.min(650, 320 + amount * 2.8);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setN(Math.round(amount * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [amount, reducedMotion]);

  return (
    <span
      dir="ltr"
      className={`journey-points-enter font-pixel font-bold tracking-wider tabular-nums ${className ?? ''}`}
      style={{ fontSize: suffix === 'total' ? 9 : 8, color: '#ffdf73', textShadow: '0 1px 2px rgba(0,0,0,0.95), 0 0 14px rgba(247,201,72,0.35)' }}
    >
      +{n} {suffix === 'total' ? 'total' : 'points'}
    </span>
  );
}

function JourneyRunningTotal({
  target,
  beatKey,
  reducedMotion,
  pointsGold,
}: {
  target: number;
  beatKey: number;
  reducedMotion: boolean;
  pointsGold: string;
}) {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (reducedMotion) { fromRef.current = target; setDisplay(target); return; }
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    const span = Math.abs(target - from);
    const duration = Math.min(720, 280 + span * 0.75);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (target - from) * eased);
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [beatKey, target, reducedMotion]);

  return (
    <span
      dir="ltr"
      className="font-pixel font-bold tabular-nums tracking-[0.12em]"
      style={{
        fontSize: 'clamp(1.05rem, min(3vw, 5dvh), 2.2rem)',
        color: pointsGold,
        textShadow: `0 0 20px ${pointsGold}88, 0 2px 4px rgba(0,0,0,0.9)`,
        lineHeight: 1,
      }}
    >
      +{display}
    </span>
  );
}

export const JourneyScene = ({ active, reducedMotion, theme }: SceneComponentProps) => {
  const phaseMax = steps.length;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    if (reducedMotion) { setPhase(steps.length); return; }
    setPhase(0);
  }, [active, reducedMotion]);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const id = window.setInterval(() => setPhase((v) => (v + 1) % (phaseMax + 1)), BEAT_MS);
    return () => window.clearInterval(id);
  }, [active, reducedMotion, phaseMax]);

  const blue = theme.accent;
  const pointsGold = '#F7C948';

  const cumulativeTarget = useMemo(() => {
    if (phase >= steps.length) return 400;
    return (phase + 1) * 100;
  }, [phase]);

  return (
    <div className="journey-scene-fit relative flex h-full min-h-0 w-full flex-col overflow-hidden px-4 pb-8 pt-3 sm:px-8 sm:pb-12 sm:pt-5 lg:px-14" dir="rtl">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{
        background: `
          radial-gradient(ellipse 72% 50% at 85% -5%, ${theme.glow} 0%, transparent 52%),
          radial-gradient(ellipse 55% 42% at 8% 100%, rgba(0,200,255,0.07) 0%, transparent 50%)
        `,
      }} />

      {/* ── TOTAL POINTS — large display ── */}
      <div
        className={`relative z-[2] mx-auto mb-2 flex flex-col items-center gap-1 text-center ${active ? 'kinetic-fade' : 'opacity-0'}`}
        style={{ animationDelay: '40ms' }}
        dir="ltr"
      >
        <span
          className="font-pixel tracking-[0.3em] uppercase"
          style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.7rem)', color: '#ffffff', textShadow: '0 0 14px rgba(255,255,255,0.35)', letterSpacing: '0.35em' }}
        >
          TOTAL POINTS
        </span>
        {active && (
          <JourneyRunningTotal beatKey={phase} target={cumulativeTarget} reducedMotion={!!reducedMotion} pointsGold={pointsGold} />
        )}
        <span
          className="font-pixel"
          style={{ fontSize: 'clamp(0.4rem, 0.9vw, 0.55rem)', color: '#ffffff', letterSpacing: '0.18em', opacity: 0.85 }}
        >
          LEVEL UP!
        </span>
      </div>

      <header className="relative z-[2] shrink-0 text-right">
        <span className={`kicker-label inline-flex ${active ? 'kinetic-fade' : 'opacity-0'}`} style={{ color: '#ffffff', animationDelay: '60ms' }}>
          {theme.kicker}
        </span>
        <h2
          className="mt-2 font-black leading-[0.95] tracking-tight font-cartoon sm:mt-3"
          style={{ fontSize: 'clamp(1.65rem, min(4.8vw, 6dvh), 4.2rem)', color: '#f3f0eb' }}
        >
          <span className="block comic-text-shadow-sm">
            <KineticHeading text="يوسف" active={active} reducedMotion={reducedMotion} startDelayMs={120} />
          </span>
          <span className="mt-1.5 block sm:mt-2" style={{ color: blue, textShadow: `2px 2px 0 rgba(0,20,40,0.55), 0 0 22px ${theme.glow}` }}>
            <KineticHeading text="معاك خطوة بخطوة" active={active} reducedMotion={reducedMotion} startDelayMs={380} />
          </span>
        </h2>
      </header>

      {/* Roadmap: only horizontal pan; vertical space from layout + short-height scaling (no vertical scroll region). */}
      <div className="relative z-[2] mt-auto flex min-h-0 flex-1 flex-col justify-end">
        <div className="scrollbar-hide w-full overflow-x-auto overflow-y-visible pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1 [-webkit-overflow-scrolling:touch] sm:pb-4 sm:pt-2" dir="ltr">
            <div className="journey-roadmap-row mx-auto flex min-w-max items-start justify-center px-3 pb-2 sm:px-8 lg:min-w-0 lg:w-full lg:max-w-6xl lg:px-10 xl:max-w-7xl">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = active && !reducedMotion && phase === index;
              const isDone = active && (phase > index || phase === steps.length);
              const isFuture = active && phase < index;

              return (
                <Fragment key={step.title}>
                  {/* Step circle + text column */}
                  <div
                    className={`flex w-[9rem] shrink-0 flex-col items-center sm:w-[10.5rem] ${active ? 'kinetic-rise' : 'opacity-0'}`}
                    style={{ animationDelay: `${260 + index * 120}ms` }}
                  >
                    <div className="mb-3 flex h-14 w-full shrink-0 items-center justify-center px-1">
                      <span
                        className="block w-full text-center font-pixel text-[8px] leading-snug tracking-[0.1em]"
                        dir="ltr"
                        style={{
                          color: isFuture ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.95)',
                          textShadow: '0 1px 2px rgba(0,0,0,1)',
                        }}
                      >
                        STAGE&nbsp;{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="relative -mt-3 flex w-full flex-col items-center">
                      <div
                        className={`relative grid shrink-0 place-items-center rounded-full transition-all duration-500 ${isActive && !reducedMotion ? 'journey-active-ring' : ''}`}
                        style={{
                          width: ROADMAP_RING_PX,
                          height: ROADMAP_RING_PX,
                          background: isFuture
                            ? `radial-gradient(circle at 45% 35%, rgba(4,14,28,0.92) 0%, rgba(2,8,18,0.96) 55%, rgba(1,5,12,1) 100%)`
                            : `radial-gradient(circle at 42% 32%, rgba(4,18,32,0.95) 0%, rgba(2,10,22,0.98) 52%, rgba(1,6,14,1) 100%)`,
                          boxShadow: !(isActive && !reducedMotion)
                            ? isDone
                              ? [`0 0 0 2px rgba(0,0,0,0.9)`, `0 0 0 4px ${blue}55`, `inset 0 2px 8px rgba(0,0,0,0.55)`, `0 0 22px ${theme.glow}55`].join(', ')
                              : [`0 0 0 2px rgba(0,0,0,0.88)`, `inset 0 0 0 1px rgba(255,255,255,0.08)`, `inset 0 8px 20px rgba(0,0,0,0.35)`].join(', ')
                            : undefined,
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-[5px] rounded-full transition-all duration-500"
                          style={{
                            borderWidth: 4,
                            borderStyle: isDone && !isActive ? 'solid' : 'dashed',
                            borderColor: isActive ? blue : isDone ? `${blue}dd` : `${blue}44`,
                            opacity: isFuture ? 0.6 : 1,
                            boxShadow: isActive ? `inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 12px ${blue}88` : undefined,
                          }}
                        />

                        {(isDone && !isActive) ? (
                          <span className="absolute right-1 top-1 z-[3] flex h-[1.0625rem] w-[1.0625rem] items-center justify-center rounded-full border border-black/55 bg-[#e6b922] shadow-[2px_2px_0_rgba(0,0,0,0.7)] sm:right-2 sm:top-2 sm:h-4 sm:w-4">
                            <Check className="h-2.5 w-2.5 text-[#0d0612]" strokeWidth={3} aria-hidden />
                          </span>
                        ) : null}

                        <span className="relative z-[2] flex size-[1.85rem] shrink-0 items-center justify-center [&>svg]:block [&>svg]:size-[1.85rem]">
                          <Icon
                            aria-hidden
                            style={{
                              color: isActive ? blue : isDone ? `${blue}cc` : `${blue}77`,
                              filter: isActive
                                ? `drop-shadow(0 0 14px ${blue}) drop-shadow(0 1px 0 rgba(0,0,0,0.9))`
                                : isDone
                                  ? `drop-shadow(0 0 8px ${blue}66) drop-shadow(0 1px 0 rgba(0,0,0,0.85))`
                                  : 'drop-shadow(0 2px 0 rgba(0,0,0,0.8))',
                              strokeWidth: 2.65,
                              transition: 'color 500ms ease, filter 500ms ease',
                            }}
                          />
                        </span>
                      </div>

                      {/* Text below circle */}
                      <div className="mt-2.5 w-full text-center" dir="rtl">
                        <h3
                          className="font-cartoon text-[0.84rem] font-black leading-snug transition-colors duration-500 sm:text-[0.95rem]"
                          style={{
                            color: isFuture ? 'rgba(255,255,255,0.62)' : isActive ? '#ffffff' : isDone ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.78)',
                            textShadow: '0 1px 3px rgba(0,0,0,0.92)',
                          }}
                        >
                          {step.title}
                        </h3>

                        <div className="mt-1.5 flex min-h-[22px] items-center justify-center" dir="ltr">
                          {!active ? (
                            <span style={{ fontSize: 7, color: pointsGold }} className="font-pixel opacity-0">+0 points</span>
                          ) : reducedMotion ? (
                            <span style={{ fontSize: 8, color: '#ffe999', textShadow: '0 1px 2px rgba(0,0,0,0.92)' }} className="font-pixel font-bold opacity-95">
                              {isFuture ? '' : '+100 points'}
                            </span>
                          ) : isFuture ? (
                            <span className="font-pixel font-bold opacity-35" style={{ fontSize: 7, letterSpacing: '0.09em', color: 'rgba(255,255,255,0.35)' }}>······</span>
                          ) : isActive ? (
                            <JourneyPointsReveal key={`pts-${phase}-${index}`} amount={100} reducedMotion={!!reducedMotion} />
                          ) : (
                            <span className="font-pixel font-bold" style={{ fontSize: 8, letterSpacing: '0.06em', color: '#ffe999', textShadow: '0 0 10px rgba(247,201,72,0.35)' }}>
                              +100 <Check className="ml-1 inline h-3 w-3 pb-px align-middle opacity-90" aria-hidden strokeWidth={2.5} />
                            </span>
                          )}
                        </div>

                        <p
                          className={`mt-1 px-1 font-cartoon text-[10.5px] leading-snug transition-opacity duration-500 sm:text-[11.5px] sm:leading-relaxed ${isFuture ? 'opacity-[0.75]' : 'opacity-[0.92]'}`}
                          style={{
                            color: isFuture ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.92)',
                            textShadow: '0 1px 2px rgba(0,0,0,0.82)',
                          }}
                        >
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Connecting line to next step (grows on large screens so it meets the next ring) ── */}
                  {index < steps.length && (
                    <div
                      className="mt-0 h-0.5 min-w-[14px] shrink-0 self-start sm:min-w-[18px] lg:min-w-0 lg:flex-1 lg:basis-0"
                      style={{
                        marginTop: ROADMAP_CONNECTOR_TOP,
                        background: isDone
                          ? `linear-gradient(90deg, ${blue}cc, ${blue}88)`
                          : 'rgba(0,200,255,0.15)',
                        boxShadow: isDone ? `0 0 8px ${blue}55` : 'none',
                        transition: 'background 500ms, box-shadow 500ms',
                      }}
                    />
                  )}
                </Fragment>
              );
            })}

            {/* ── Key / completion step ── */}
            <div
              className={`flex w-[9rem] shrink-0 flex-col items-center sm:w-[10.5rem] ${active ? 'kinetic-rise' : 'opacity-0'}`}
              style={{ animationDelay: `${260 + steps.length * 120}ms` }}
            >
              <div className="mb-3 flex h-14 w-full shrink-0 items-center justify-center px-2">
                <span
                  className="block w-full text-center font-pixel text-[8px] leading-snug tracking-[0.1em]"
                  dir="ltr"
                  style={active && phase >= steps.length
                    ? { color: 'rgba(245,206,105,1)', textShadow: '0 1px 2px rgba(0,0,0,1)' }
                    : { color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 2px rgba(0,0,0,1)' }
                  }
                >
                  EXTRA
                </span>
              </div>
              <div className="-mt-3 flex w-full flex-col items-center">
              <div
                className={`relative grid shrink-0 place-items-center rounded-full transition-all duration-500 ${active && phase === steps.length && !reducedMotion ? 'journey-active-ring' : ''}`}
                style={{
                  width: ROADMAP_RING_PX,
                  height: ROADMAP_RING_PX,
                  boxShadow: active && phase === steps.length
                    ? `inset 0 2px 10px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(230,185,34,0.35), 0 0 0 3px ${blue}55, 0 0 40px rgba(247,201,72,0.35), 0 0 64px ${theme.glow}`
                    : `inset 0 2px 10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,200,255,0.15), 0 0 0 2px rgba(0,0,0,0.8), 0 0 20px rgba(0,200,255,0.12)`,
                  background: phase === steps.length
                    ? `radial-gradient(circle at 48% 25%, rgba(30,22,8,0.92) 0%, rgba(6,4,18,1) 55%, rgba(2,3,12,1) 100%)`
                    : `radial-gradient(circle at 50% 30%, rgba(4,14,30,0.92) 0%, rgba(2,8,18,1) 70%, rgba(1,5,12,1) 100%)`,
                  opacity: active && phase < steps.length ? 0.72 : 1,
                }}
              >
                <img
                  src="/roadmap-key.png"
                  alt="مفتاح الإكمال"
                  className={`relative z-[1] mx-auto block h-[76%] w-[76%] select-none object-contain ${active && phase === steps.length && !reducedMotion ? 'journey-key-float' : ''}`}
                  style={{ filter: `drop-shadow(0 12px 18px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(247,201,72,0.35))`, imageRendering: 'pixelated' }}
                  draggable={false}
                />
              </div>

              <div className="mt-2.5 text-center font-cartoon font-bold leading-snug transition-opacity duration-500" dir="rtl"
                style={{ fontSize: '0.84rem', color: phase === steps.length ? '#ffffff' : 'rgba(255,255,255,0.88)', textShadow: '0 1px 3px rgba(0,0,0,0.92)' }}
              >
                مفتاح الإكمال
              </div>

              <div className="mt-1.5 flex min-h-[22px] items-center justify-center" dir="ltr">
                {active && phase === steps.length && !reducedMotion ? (
                  <JourneyPointsReveal key={`keypts-${phase}`} amount={400} reducedMotion={!!reducedMotion} suffix="total" />
                ) : (
                  <span className="font-pixel font-bold tracking-wide" style={{ fontSize: 9, color: '#ffe999', textShadow: '0 1px 2px rgba(0,0,0,0.95)' }}>
                    +400 total
                  </span>
                )}
              </div>

              <span
                className="mt-2 max-w-[10rem] text-center font-cartoon text-[10.5px] leading-snug sm:mt-3 sm:text-[11.5px] sm:leading-relaxed"
                style={{ color: phase === steps.length ? '#ffffff' : 'rgba(255,255,255,0.78)', textShadow: '0 1px 2px rgba(0,0,0,0.82)' }}
              >
                أكمِل المسار لفتح المواقف التالية داخل تجربة اللعب.
              </span>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};
