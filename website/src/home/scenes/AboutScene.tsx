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

function toArNum(n: number): string {
  return n.toLocaleString('ar-EG', { useGrouping: false });
}

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

export const AboutScene = ({ active, reducedMotion }: SceneComponentProps) => {
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
    <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col gap-5 overflow-hidden px-4 pb-6 pt-4 sm:px-6 lg:flex-row lg:items-stretch lg:gap-6 lg:px-8">

      {/* ── Left: CRT character display ── */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col lg:max-w-[56%]">
        <div
          className={`about-crt-outer ${active ? 'kinetic-rise' : 'opacity-0'}`}
          style={{ animationDelay: reducedMotion ? '0ms' : '120ms' }}
        >
          <div className="about-crt-spin" aria-hidden />
          <div className="about-crt-inner">
            <div className="about-scanlines absolute inset-0 z-[2] opacity-50" aria-hidden />

            <div dir="ltr" className="pointer-events-none absolute inset-x-2 top-3 z-[4] flex justify-between sm:inset-x-4">
              <button
                type="button"
                aria-label="الشخصية السابقة"
                onClick={() => go(-1)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center border-2 border-[#202544] bg-[#F7C948] text-[#202544] shadow-[3px_3px_0_#202544] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:h-11 sm:w-11"
                style={{ borderRadius: '4px' }}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                aria-label="الشخصية التالية"
                onClick={() => go(1)}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center border-2 border-[#202544] bg-[#F7C948] text-[#202544] shadow-[3px_3px_0_#202544] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:h-11 sm:w-11"
                style={{ borderRadius: '4px' }}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            <div
              ref={stageRef}
              className="relative z-[3] px-5 pb-6 pt-10 sm:px-8 sm:pb-10 sm:pt-12"
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
              <div style={tiltStyle} className="mx-auto w-full max-w-[min(100%,460px)] will-change-transform">
                <img
                  key={current.id}
                  src={current.src}
                  alt={`${current.nameAr}`}
                  className={`mx-auto block h-auto w-full select-none object-contain drop-shadow-[0_28px_50px_rgba(32,37,68,0.28)] ${active && !reducedMotion ? 'float-medium' : ''}`}
                  style={{ maxHeight: 'min(58vh, 560px)', imageRendering: 'auto' }}
                  draggable={false}
                  onError={onImgError}
                />
              </div>
            </div>

            {/* CRT footer LEDs */}
            <div className="relative z-[4] flex justify-center gap-2 border-t border-[#202544]/10 bg-white/18 px-3 py-2.5 backdrop-blur-sm">
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

        {/* Character thumbnails */}
        <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
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
                    width: '4.65rem',
                    height: '4.65rem',
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
                <span
                  className="font-pixel text-[6px] font-normal"
                  style={{ color: selected ? NEON_BLUE : 'rgba(32,37,68,0.45)' }}
                  dir="rtl"
                >
                  منفذ {toArNum(i + 1)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right: merged character info + stats card ── */}
      <div className="flex w-full min-w-0 flex-col justify-start gap-4 lg:w-[min(100%,26rem)] lg:flex-none">
        <header className="text-right">
          <div
            className={`inline-flex items-center border-2 border-[#202544] px-3 py-1.5 font-cartoon text-[11px] font-extrabold text-[#202544] shadow-[3px_3px_0_${NEON_BLUE}] ${active ? 'kinetic-fade' : 'opacity-0'}`}
            style={{ animationDelay: '80ms', background: ACCENT_CYAN, borderRadius: '4px' }}
          >
            وضع اختيار البطل
          </div>

          <h2 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,2.85rem)] font-black leading-tight tracking-tight text-[#202544]">
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
            className="px-4 py-3 border-b"
            style={{ borderColor: `${NEON_BLUE}22`, background: `${NEON_BLUE}08` }}
          >
            <div className="flex flex-wrap items-baseline justify-end gap-3">
              <h3 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: '#f0f8ff' }}>{current.nameAr}</h3>
              <span className="font-pixel text-[6px] tracking-widest" style={{ color: '#ffffff', opacity: 0.9 }} lang="en">
                {current.nameEn}
              </span>
            </div>
            <p className="mt-1 font-cartoon text-sm font-semibold text-right" style={{ color: '#ffffff' }}>{current.role}</p>
            <p className="mt-0.5 font-cartoon text-xs leading-relaxed text-right" style={{ color: '#ffffff', opacity: 0.92 }}>{current.keywords}</p>
          </div>

          {/* Stats section */}
          <div className="px-4 py-3">
            <div className="mb-3 flex flex-col items-end gap-1 pb-2 text-right">
              <span className="font-cartoon text-xs font-extrabold" style={{ color: '#ffffff' }}>سمات الشخصية</span>
              <span className="max-w-[16rem] text-right font-cartoon text-[11px] font-bold leading-snug" style={{ color: '#ffffff' }}>
                {current.perk}
              </span>
            </div>
            <div className="space-y-3">
              {current.stats.map((s) => (
                <div key={s.key}>
                  <div className="mb-1 flex justify-between font-cartoon text-xs font-bold">
                    <span style={{ color: '#ffffff' }}>{s.key}</span>
                    <span style={{ color: NEON_BLUE, textShadow: `0 0 8px ${NEON_BLUE}` }}>{s.value}%</span>
                  </div>
                  <div className="h-2 border" style={{ borderRadius: '2px', borderColor: `${NEON_BLUE}22`, background: 'rgba(0,20,40,0.6)' }}>
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
    </div>
  );
};
