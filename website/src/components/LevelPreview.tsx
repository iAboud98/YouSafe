import { BadgeHelp, PlayCircle, Route, Star } from 'lucide-react';
import { useReveal } from './useReveal';

export const LevelPreview = () => {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-10 sm:py-14">
      <div className="mb-8 text-right">
        <p className="text-sm font-bold uppercase tracking-[0.34em] text-sky-700/70">معاينة من مراحل اللعبة</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">مرحلة تبدو كواجهة لعبة حقيقية</h2>
        <p className="mt-3 max-w-2xl leading-8 text-slate-600">كل مرحلة مصممة لتعليم مهارة سلامة بطريقة ممتعة.</p>
      </div>

      <article className="level-card relative overflow-hidden rounded-[2.5rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(240,249,255,0.95)_100%)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.12),transparent_25%),radial-gradient(circle_at_80%_16%,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_40%_90%,rgba(34,197,94,0.10),transparent_24%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="text-right">
            <div className="flex flex-wrap justify-end gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">سهل</span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700">قريبًا</span>
            </div>

            <h3 className="mt-5 text-3xl font-black text-slate-950">السلامة في الشارع</h3>
            <p className="mt-4 max-w-2xl leading-8 text-slate-600">تعلّم كيف تعبر الشارع بأمان، تنتبه للإشارات، وتطلب المساعدة عند الحاجة.</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <span>جاهزية المرحلة</span>
                <span>75%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-sky-100">
                <div className={`${visible ? 'animate-progress-grow w-[75%]' : 'w-[8%]'} h-full rounded-full bg-[linear-gradient(90deg,#22c55e_0%,#38bdf8_45%,#facc15_100%)] shadow-[0_0_18px_rgba(14,165,233,0.35)] transition-[width] duration-[1800ms]`} />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="button" disabled className="inline-flex items-center justify-center rounded-full border border-sky-100 bg-white px-6 py-3 text-sm font-bold text-slate-500 shadow-sm">
                <PlayCircle className="ml-2 h-4 w-4" />
                ابدأ المرحلة
              </button>
            </div>
          </div>

          <div className="relative min-h-[18rem] rounded-[2rem] border border-white/90 bg-white/80 p-5 shadow-[inset_0_0_40px_rgba(255,255,255,0.4)] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.12),transparent_30%)]" />
            <div className="relative h-full">
              <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 shadow-[0_12px_24px_rgba(14,165,233,0.12)]">
                <BadgeHelp className="h-5 w-5" />
              </div>
              <div className="absolute left-4 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-[0_12px_24px_rgba(250,204,21,0.12)]">
                <Star className="h-5 w-5" />
              </div>

              <div className="absolute left-1/2 top-[30%] h-[2px] w-[70%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#0ea5e9,#38bdf8,#facc15,transparent)] animate-path-flow" />
              <div className="absolute left-[16%] top-[26%] h-4 w-4 rounded-full bg-sky-500 shadow-[0_0_14px_rgba(14,165,233,0.75)]" />
              <div className="absolute left-[33%] top-[42%] h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(34,197,94,0.75)]" />
              <div className="absolute left-[52%] top-[28%] h-4 w-4 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(250,204,21,0.8)]" />
              <div className="absolute left-[70%] top-[46%] h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_14px_rgba(6,182,212,0.75)]" />

              <div className="absolute right-[8%] bottom-[18%] h-20 w-16 rounded-[1.5rem] border border-sky-100 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.07)]" />
              <div className="absolute right-[24%] bottom-[26%] h-14 w-14 rounded-full border border-amber-100 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.07)]" />
              <div className="absolute right-[43%] bottom-[18%] h-16 w-12 rounded-2xl border border-emerald-100 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.07)]" />
              <div className="absolute right-[60%] bottom-[28%] h-12 w-12 rounded-[1rem] border border-cyan-100 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.07)]" />

              <div className="absolute bottom-4 left-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                <Route className="h-4 w-4 text-sky-600" />
                مسار المهمة
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};