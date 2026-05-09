import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
} from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { KineticHeading } from '../components/KineticHeading';
import { PixelScrollArrows } from '../components/PixelScrollArrows';
import type { SceneComponentProps } from '../types';

const ACCENT_CYAN = '#35D6FF';
const NEON_BLUE = '#00C8FF';
const CTA_YELLOW = '#F7C948';

type Stat = { key: string; value: number };

type Character = {
  id: string;
  src: string;
  nameAr: string;
  nameEn: string;
  role: string;
  keywords: string;
  stats: Stat[];
  perk: string;
};

const characters: Character[] = [
  {
    id: 'subhi',
    src: '/char-subhi.png',
    nameAr: 'صبحي',
    nameEn: 'SUBHI',
    role: 'الصديق الفضولي',
    keywords: 'فضولي · متفائل · مغامر',
    stats: [
      { key: 'فضول', value: 94 },
      { key: 'سرعة', value: 88 },
      { key: 'ابتسامة', value: 97 },
    ],
    perk: 'يثير الأسئلة ويكتشف التفاصيل',
  },
  {
    id: 'yousafe',
    src: '/char-yousafe.png',
    nameAr: 'يوسف',
    nameEn: 'YOUSAFE',
    role: 'البطل · المرشد',
    keywords: 'شجاع · حامي · دليل الأمان',
    stats: [
      { key: 'قيادة', value: 96 },
      { key: 'أمان', value: 99 },
      { key: 'روح الفريق', value: 91 },
    ],
    perk: 'دور المرشد: يوجّه ويحمي',
  },
  {
    id: 'layla',
    src: '/char-layla.png',
    nameAr: 'ليلى',
    nameEn: 'LAYLA',
    role: 'الذكية الحنونة',
    keywords: 'ذكية · حنونة · لمّاحة',
    stats: [
      { key: 'ذكاء', value: 98 },
      { key: 'تعاطف', value: 95 },
      { key: 'حلّ المشكلات', value: 92 },
    ],
    perk: 'تفكّر بهدوء وتحل المواقف',
  },
  {
    id: 'kareem',
    src: '/char-kareem.png',
    nameAr: 'كريم',
    nameEn: 'KAREEM',
    role: 'المستكشف المرح',
    keywords: 'مرح · لطيف · مستكشف',
    stats: [
      { key: 'مرح', value: 96 },
      { key: 'شجاعة', value: 87 },
      { key: 'تعاون', value: 93 },
    ],
    perk: 'يشجّع وتجاوز الخوف خطوة بخطوة',
  },
];

const SWIPE_PX = 52;

export const AboutScene = ({ active, reducedMotion, theme, onNavigate }: SceneComponentProps) => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const go = useCallback((delta: number) => {
    setIndex((i) => {
      const n = i + delta;
      if (n < 0) return characters.length - 1;
      if (n >= characters.length) return 0;
      return n;
    });
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go]);

  useEffect(() => {
    if (active) setIndex(0);
  }, [active]);

  const current = characters[index];

  const onImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (el.dataset.fallbackDone) return;
    el.dataset.fallbackDone = '1';
    el.src = '/hero-blast.png';
  };

  const onStageMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!active || reducedMotion || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 9, ry: px * 11 });
  };

  const onStageMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  const tiltStyle =
    reducedMotion || !active
      ? undefined
      : {
          transform: `perspective(960px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.02)`,
          transition: 'transform 80ms linear',
        };

  return (
    <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col gap-3 overflow-hidden px-4 pb-16 pt-2 sm:gap-5 sm:px-6 sm:pb-6 sm:pt-4 lg:flex-row lg:items-center lg:gap-8 lg:px-10">

      {/* ── CRT character display + thumbnails ── */}
      <div className="relative order-2 flex min-h-0 min-w-0 shrink-0 items-center gap-5 sm:order-1 sm:flex-1 lg:max-w-[60%]">

        {/* Thumbnails column — appears on the right in RTL */}
        <div className="hidden flex-col items-center gap-3 lg:flex lg:order-first">
          {/* Up arrow */}
          <button
            type="button"
            aria-label="الشخصية السابقة"
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center border-2 border-[#202544] bg-[#F7C948] text-[#202544] shadow-[3px_3px_0_#202544] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:h-11 sm:w-11"
            style={{ borderRadius: '4px' }}
          >
            <ChevronLeft className="h-5 w-5 rotate-90" strokeWidth={2.5} />
          </button>

          {/* Character thumbnails — vertical */}
          {characters.map((char, i) => {
            const selected = i === index;
            return (
              <button
                key={char.id}
                type="button"
                aria-label={`تحديد ${char.nameAr}`}
                aria-current={selected ? 'true' : undefined}
                onClick={() => setIndex(i)}
                className="group relative flex flex-col items-center gap-1.5 transition-transform active:scale-95"
              >
                <div
                  className="relative overflow-hidden border-[3px] transition-all duration-200"
                  style={{
                    width: '5.5rem',
                    height: '5.5rem',
                    borderRadius: '6px',
                    borderColor: selected ? NEON_BLUE : '#202544',
                    boxShadow: selected ? `4px 4px 0 ${CTA_YELLOW}, 0 0 18px ${NEON_BLUE}55` : '4px 4px 0 #202544',
                    transform: selected ? 'translate(-2px, -2px)' : 'none',
                    background: '#EEF2F9',
                  }}
                >
                  <img
                    src={char.src}
                    alt=""
                    className={`h-full w-full object-contain object-center transition-all duration-300 group-hover:scale-[1.03] ${selected ? 'opacity-100' : 'opacity-60 grayscale-[0.85]'}`}
                    draggable={false}
                    onError={onImgError}
                  />
                  {selected ? (
                    <Sparkles className="absolute left-1 top-1 h-3.5 w-3.5 text-[#F7C948] drop-shadow-sm" aria-hidden />
                  ) : null}
                </div>
              </button>
            );
          })}

          {/* Down arrow */}
          <button
            type="button"
            aria-label="الشخصية التالية"
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center border-2 border-[#202544] bg-[#F7C948] text-[#202544] shadow-[3px_3px_0_#202544] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:h-11 sm:w-11"
            style={{ borderRadius: '4px' }}
          >
            <ChevronRight className="h-5 w-5 rotate-90" strokeWidth={2.5} />
          </button>
        </div>

        {/* CRT panel */}
        <div className="flex-1 min-w-0">
          <div
            className={`about-crt-outer ${active ? 'kinetic-rise' : 'opacity-0'}`}
            style={{ animationDelay: reducedMotion ? '0ms' : '120ms' }}
          >
            <div className="about-crt-spin" aria-hidden />
            <div className="about-crt-inner">
              <div className="about-scanlines absolute inset-0 z-[2] opacity-50" aria-hidden />

              <div
                ref={stageRef}
                className="relative z-[3] px-3 pb-3 pt-3 sm:px-8 sm:pb-8 sm:pt-8"
                onMouseMove={onStageMouseMove}
                onMouseLeave={onStageMouseLeave}
                onTouchStart={(e) => { touchStartX.current = e.touches[0]?.clientX ?? null; }}
                onTouchEnd={(e) => {
                  const start = touchStartX.current;
                  touchStartX.current = null;
                  if (start == null) return;
                  const dx = e.changedTouches[0].clientX - start;
                  if (dx > SWIPE_PX) go(-1);
                  else if (dx < -SWIPE_PX) go(1);
                }}
              >
                <div style={{ ...tiltStyle, aspectRatio: '666 / 375' }} className="mx-auto flex w-full max-w-[min(100%,280px)] items-center justify-center will-change-transform sm:max-w-[min(100%,640px)]" >
                  <img
                    key={current.id}
                    src={current.src}
                    alt={`${current.nameAr}`}
                    className={`mx-auto block h-full w-full select-none object-contain drop-shadow-[0_28px_50px_rgba(32,37,68,0.28)] ${active && !reducedMotion ? 'float-medium' : ''}`}
                    style={{ imageRendering: 'auto' }}
                    draggable={false}
                    onError={onImgError}
                  />
                </div>
              </div>

              {/* CRT footer LEDs — hidden on mobile */}
              <div className="relative z-[4] hidden justify-center gap-2 border-t border-[#202544]/10 bg-white/18 px-3 py-2.5 backdrop-blur-sm sm:flex">
                {characters.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`انتقَل إلى ${c.nameAr}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => setIndex(i)}
                    className="h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? '2.25rem' : '0.55rem',
                      background: i === index ? NEON_BLUE : '#c5cedd',
                      boxShadow: i === index ? `0 0 12px ${NEON_BLUE}99` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Right: merged character info + stats card (shown first on mobile) ── */}
      <div className="order-1 flex w-full min-w-0 flex-col justify-center gap-3 sm:order-2 sm:gap-5 lg:w-[min(100%,30rem)] lg:flex-none">
        <header className="text-right">
          <div
            className={`inline-flex items-center border-2 border-[#202544] px-3 py-1.5 font-cartoon text-[11px] font-extrabold text-[#202544] shadow-[3px_3px_0_${NEON_BLUE}] ${active ? 'kinetic-fade' : 'opacity-0'}`}
            style={{ animationDelay: '80ms', background: ACCENT_CYAN, borderRadius: '4px' }}
          >
            وضع اختيار البطل
          </div>

          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-tight tracking-tight text-[#202544]">
            <span className={`block ${active ? 'kinetic-rise' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
              <KineticHeading text="الشخصيات" active={active} reducedMotion={reducedMotion} startDelayMs={180} />
            </span>
          </h2>
        </header>

        {/* ── Single merged game-style card ── */}
        <div
          key={current.id}
          className="about-widget-enter"
          style={{
            animationDelay: '120ms',
            background: 'rgba(2,14,28,0.92)',
            border: `2px solid ${NEON_BLUE}55`,
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: `0 0 0 1px rgba(0,0,0,0.8), 4px 4px 0 rgba(0,0,0,0.6), 0 0 24px ${NEON_BLUE}22`,
          }}
        >
          {/* Character name bar */}
          <div
            className="px-4 py-2.5 border-b sm:px-5 sm:py-4"
            style={{ borderColor: `${NEON_BLUE}22`, background: `${NEON_BLUE}08` }}
          >
            <div className="flex flex-wrap items-baseline justify-end gap-3">
              <h3 className="font-display text-2xl font-bold sm:text-5xl" style={{ color: '#f0f8ff' }}>{current.nameAr}</h3>
              <span className="font-pixel text-[6px] tracking-widest" style={{ color: '#ffffff', opacity: 0.9 }} lang="en">
                {current.nameEn}
              </span>
            </div>
            <p className="mt-1 font-cartoon text-base font-semibold text-right" style={{ color: '#ffffff' }}>{current.role}</p>
            <p className="mt-0.5 font-cartoon text-sm leading-relaxed text-right" style={{ color: '#ffffff', opacity: 0.92 }}>{current.keywords}</p>
          </div>

          {/* Stats section */}
          <div className="px-4 py-2.5 sm:px-5 sm:py-4">
            <div className="mb-3 flex flex-col items-end gap-1 pb-2 text-right">
              <span className="font-cartoon text-sm font-extrabold" style={{ color: '#ffffff' }}>سمات الشخصية</span>
              <span className="max-w-[18rem] text-right font-cartoon text-xs font-bold leading-snug" style={{ color: '#ffffff' }}>
                {current.perk}
              </span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {current.stats.map((s) => (
                <div key={s.key}>
                  <div className="mb-1 flex justify-between font-cartoon text-sm font-bold">
                    <span style={{ color: '#ffffff' }}>{s.key}</span>
                    <span style={{ color: NEON_BLUE, textShadow: `0 0 8px ${NEON_BLUE}` }}>{s.value}%</span>
                  </div>
                  <div className="h-3 border" style={{ borderRadius: '2px', borderColor: `${NEON_BLUE}22`, background: 'rgba(0,20,40,0.6)' }}>
                    <div
                      className="about-stat-bar-fill h-full"
                      style={{
                        width: `${s.value}%`,
                        borderRadius: '2px',
                        background: `linear-gradient(90deg, ${NEON_BLUE}88 0%, ${NEON_BLUE} 100%)`,
                        boxShadow: `0 0 10px ${NEON_BLUE}66`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PixelScrollArrows accent={theme.accent} active={active} reducedMotion={reducedMotion} onClick={() => onNavigate?.('journey')} />
    </div>
  );
};
