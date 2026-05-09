import { Home, MapPinned, School, TriangleAlert } from 'lucide-react';
import type { CSSProperties } from 'react';
import { KineticHeading } from '../components/KineticHeading';
import type { SceneComponentProps } from '../types';

/** Marquee — Tajawal (distinct from headline Almarai/Fredoka) on striped bands */
const marqueeTextStyle: CSSProperties = {
  fontFamily: "'Tajawal', 'Almarai', system-ui, sans-serif",
  fontWeight: 900,
  letterSpacing: '0.02em',
  color: '#ffffff',
  textShadow: '0 2px 0 rgba(0,0,0,0.92), 0 1px 3px rgba(0,0,0,1), 1px 1px 0 rgba(255,255,255,0.12)',
};
const marqueeTextStyleMuted: CSSProperties = {
  ...marqueeTextStyle,
  color: 'rgba(255,255,255,0.88)',
};

const headlineFirstLineStyle: CSSProperties = {
  color: '#ffffff',
  textShadow:
    '0 2px 0 rgba(0,0,0,0.92), 2px 2px 0 rgba(0,0,0,0.82), -1px -1px 0 rgba(255,253,246,0.1)',
};

const headlineAccentShadow = (accent: string) =>
  `0 3px 0 rgba(0,0,0,0.94), 2px 2px 0 rgba(0,0,0,0.82), -1px -1px 0 rgba(0,0,0,0.45), 0 0 20px rgba(0,0,0,0.7), 0 0 18px ${accent}55`;

const scenarios = [
   { title: 'السلامة في المنزل', icon: Home },
  { title: 'السلامة في المدرسة', icon: School },
  { title: 'السلامة عند الضياع', icon: TriangleAlert },
  { title: 'السلامة من الحريق ', icon: TriangleAlert },
  { title: 'السلامة في الشارع', icon: MapPinned },
  { title: 'السلامة في المنزل', icon: Home },
  { title: 'السلامة في المدرسة', icon: School },
  { title: 'السلامة عند الضياع', icon: TriangleAlert },
  { title: 'السلامة من الحريق ', icon: TriangleAlert },
];

export const ScenariosCarouselScene = ({ active, reducedMotion, theme }: SceneComponentProps) => {
  return (
    <div className="relative grid h-full w-full grid-rows-[auto_1fr_auto] gap-8 px-6 pb-10 pt-6 sm:px-12 lg:px-20">
      <div className="text-right">
        <span
          className={`kicker-label inline-flex ${active ? 'kinetic-fade' : 'opacity-0'}`}
          style={{ color: '#ffffff', animationDelay: '60ms' }}
        >
          {theme.kicker}
        </span>
        <h2 className="mt-4 font-black leading-[0.95] tracking-tight font-cartoon" style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
          <span className="block" style={headlineFirstLineStyle}>
            <KineticHeading text="من مواقف بتتكرر كل يوم" active={active} reducedMotion={reducedMotion} startDelayMs={120} />
          </span>
          <span
            className="mt-1 block"
            style={{ color: theme.accent, textShadow: headlineAccentShadow(theme.accent) }}
          >
            <KineticHeading text=" لأشياء بنستبعد حدوثها !" active={active} reducedMotion={reducedMotion} startDelayMs={400} />
          </span>
        </h2>
      </div>

      {/* ── Arcade marquee rows (diagonal stripes + display font) ── */}
      <div className="flex flex-col justify-center gap-3 overflow-hidden">
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}66, transparent)` }} />

        <div
          className="overflow-hidden rounded-sm border py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)]"
          dir="ltr"
          style={{
            borderColor: `${theme.accent}44`,
            background: `repeating-linear-gradient(-32deg, ${theme.accent}18 0px, ${theme.accent}18 7px, rgba(12,6,22,0.94) 7px, rgba(12,6,22,0.94) 14px)`,
          }}
        >
          <div className={`flex w-max items-center gap-10 px-2 ${reducedMotion ? '' : 'marquee-track'}`}>
            {[...scenarios, ...scenarios].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={`m1-${i}`} className="flex shrink-0 items-center gap-3.5" dir="rtl">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center"
                    style={{
                      background: `${theme.accent}28`,
                      border: `1px solid ${theme.accent}60`,
                      borderRadius: '2px',
                    }}
                  >
                    <Icon className="h-4 w-4 text-white" /> 
                  </div>
                  <span className="whitespace-nowrap text-2xl sm:text-3xl" style={marqueeTextStyle}>
                    {s.title}
                  </span>
                  <div
                    className="h-1.5 w-1.5"
                    style={{ background: theme.accent, opacity: 0.55, borderRadius: '1px' }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="overflow-hidden rounded-sm border py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)]"
          dir="ltr"
          style={{
            borderColor: `${theme.accent}33`,
            background: `repeating-linear-gradient(32deg, rgba(8,4,16,0.96) 0px, rgba(8,4,16,0.96) 7px, ${theme.accent}14 7px, ${theme.accent}14 14px)`,
          }}
        >
          <div
            className={`flex w-max items-center gap-10 px-2 ${reducedMotion ? '' : 'marquee-track'}`}
            style={{ animationDirection: 'reverse', animationDuration: '52s' }}
          >
            {[...scenarios, ...scenarios].map((s, i) => (
              <div key={`m2-${i}`} className="flex shrink-0 items-center gap-4" dir="rtl">
                <span className="whitespace-nowrap text-2xl sm:text-3xl" style={marqueeTextStyleMuted}>
                  {s.title}
                </span>
                <div className="h-px w-8" style={{ background: theme.accent, opacity: 0.4 }} />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}44, transparent)` }} />
      </div>

      {/* Footer labels */}
      <div className="flex items-center justify-between gap-4">
        <span
          className="font-pixel text-[8px] tracking-widest sm:text-[9px]"
          dir="rtl"
          style={{
            color: '#ffffff',
            letterSpacing: '0.12em',
            textShadow: '0 1px 0 rgba(255,253,246,0.2), 0 2px 4px rgba(0,0,0,1)',
            opacity: 0.9,
          }}
        >
        </span>
        <span
          className="shrink-0 font-pixel text-[8px]"
          dir="ltr"
          style={{
            color: '#ffffff',
            letterSpacing: '0.12em',
            textShadow: '0 1px 0 rgba(0,0,0,0.85), 0 0 12px rgba(255,255,255,0.25)',
          }}
        >
          04 SCENES
        </span>
      </div>
    </div>
  );
};
