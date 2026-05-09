import { BrainCircuit, Compass, Gamepad2, Sparkles } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

type MissionCard = {
  icon: 'compass' | 'gamepad' | 'sparkles';
  title: string;
  text: string;
};

const icons = {
  compass: Compass,
  gamepad: Gamepad2,
  sparkles: BrainCircuit,
} as const;

type MissionPreviewProps = {
  cards: readonly MissionCard[];
};

export const MissionPreview = ({ cards }: MissionPreviewProps) => {
  return (
    <section className="py-8 sm:py-12" id="من-نحن">
      <div className="mb-8 flex flex-col gap-3 text-right">
        <span className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-200/70">خريطة اللعب</span>
        <h2 className="text-3xl font-black text-white sm:text-4xl">تبدأ مهمة السلامة من هنا</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = icons[card.icon];
          return <FeatureCard key={card.title} icon={Icon} title={card.title} text={card.text} />;
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-right">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">مرحلة أولى</span>
            <span className="rounded-full border border-amber-200/25 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-100">قريبًا</span>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-end">
            <div className="text-right">
              <h3 className="text-3xl font-black text-white">استعراض المرحلة</h3>
              <p className="mt-4 max-w-2xl leading-8 text-slate-200/90">
                <span className="font-bold text-white">السلامة في الشارع</span> تعلّم الطفل كيف يعبر الطريق بأمان، ويتعرّف على الخطر، ويطلب المساعدة عند الحاجة.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>الاستعداد</span>
                  <span>65%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-amber-200 shadow-[0_0_24px_rgba(34,211,238,0.4)]" />
                </div>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_45%)] blur-2xl" />
              <div className="relative h-72 w-full rounded-[2rem] border border-white/10 bg-slate-950/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                <div className="absolute right-6 top-6 h-4 w-4 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.55)]" />
                <div className="absolute left-8 top-10 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.55)]" />
                <div className="absolute bottom-8 right-10 h-5 w-5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.55)]" />

                <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
                <div className="absolute inset-y-8 right-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                <div className="absolute right-10 top-20 h-16 w-10 rounded-[1.2rem] border border-white/10 bg-white/8" />
                <div className="absolute right-20 top-32 h-10 w-10 rounded-full border-2 border-cyan-300/70 bg-cyan-300/10" />
                <div className="absolute right-36 top-24 h-14 w-14 rounded-3xl border border-white/10 bg-white/8" />
                <div className="absolute right-48 top-36 h-9 w-9 rounded-full border border-amber-200/70 bg-amber-300/10" />
                <div className="absolute left-10 bottom-14 h-14 w-20 rounded-full border border-white/10 bg-white/8" />
                <div className="absolute left-24 bottom-20 h-12 w-12 rounded-2xl border border-emerald-200/70 bg-emerald-300/10" />

                <div className="absolute left-8 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-200" />
                  <span className="text-sm font-semibold text-slate-200">خريطة المهمة</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-100">منظور اللعبة</span>
            <h3 className="mt-4 text-2xl font-black text-white">رحلة قصيرة، أثر كبير</h3>
            <p className="mt-4 leading-8 text-slate-200/90">
              كل مرحلة داخل YouSafe تُبنى مثل مهمة صغيرة، بحيث يفهم الطفل الفكرة بسرعة، ثم يطبّقها بثقة وهدوء.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {['تعلم آمن', 'أسئلة بسيطة', 'تقدم واضح'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-right text-sm text-white/85">
                <span>{item}</span>
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.65)]" />
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};
