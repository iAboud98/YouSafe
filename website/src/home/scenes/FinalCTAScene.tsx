import { ArrowLeft, ShieldCheck, Sparkles, Star, Heart } from 'lucide-react';

type SceneProps = {
  active: boolean;
  reducedMotion: boolean;
};

const chips = [
  { label: 'سلامة', icon: ShieldCheck },
  { label: 'قرار صحيح', icon: Star },
  { label: 'مساعدة', icon: Sparkles },
  { label: 'ثقة', icon: Heart },
] as const;

export const FinalCTAScene = ({ active, reducedMotion }: SceneProps) => {
  return (
    <div className="relative min-h-[calc(84vh-8rem)] overflow-hidden text-right">
      <div className={`${active ? 'animate-rise-in' : 'opacity-0 translate-y-6'} mb-8`}>
        <p className="text-sm font-bold uppercase tracking-[0.34em] text-slate-500">جاهز تبدأ مغامرة YouSafe؟</p>
        <h2 className="mt-3 text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-[4.8rem]">
          البداية
          <span className="mt-2 block text-sky-700">أصبحت قريبة</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">
          ابدأ رحلة ممتعة يتعلّم فيها الطفل مهارات السلامة من خلال اللعب، المواقف التفاعلية، والإرشاد الذكي.
        </p>
      </div>

      <div className="relative rounded-[2.55rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.98)_0%,rgba(255,251,244,0.98)_100%)] p-6 shadow-[0_24px_70px_rgba(84,68,45,0.10)] backdrop-blur-xl sm:p-8">
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(14,165,233,0.10),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(250,204,21,0.16),transparent_20%),radial-gradient(circle_at_50%_88%,rgba(34,197,94,0.12),transparent_22%)] ${reducedMotion ? '' : 'animate-blob-gentle'}`} />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex flex-wrap justify-end gap-3">
              {chips.map((chip, index) => {
                const Icon = chip.icon;
                return (
                  <div key={chip.label} className={`${active ? 'animate-pill-in' : 'opacity-0 translate-y-4'} circular-chip rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-[0_10px_24px_rgba(84,68,45,0.06)]`} style={{ animationDelay: `${index * 120}ms` }}>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Icon className="h-4 w-4 text-sky-700" />
                      {chip.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="hero-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_16px_36px_rgba(14,165,233,0.22)] transition hover:-translate-y-0.5">
                ابدأ الآن
              </button>
              <button type="button" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-8 py-4 text-base font-bold text-slate-700 shadow-[0_10px_24px_rgba(84,68,45,0.06)] transition hover:-translate-y-0.5 hover:bg-white">
                <ArrowLeft className="ml-2 h-4 w-4" />
                تعرّف أكثر
              </button>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[20rem] min-w-[18rem] items-center justify-center">
            <div className={`absolute h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18),transparent_58%)] ${reducedMotion ? '' : 'animate-blob-gentle'}`} />
            <div className="absolute inset-8 rounded-full border border-white/80 bg-white/85 shadow-[0_18px_46px_rgba(84,68,45,0.08)]" />
            <img src="/mascot.png" alt="الغزال البطل في YouSafe" className={`relative z-10 h-auto w-[14rem] object-contain drop-shadow-[0_24px_40px_rgba(84,68,45,0.12)] ${reducedMotion ? '' : 'animate-mascot-float'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
