import { CheckCircle2, CircleDot, FileSearch, ListChecks } from 'lucide-react';
import { useReveal } from './useReveal';

const steps = [
  { icon: CircleDot, title: 'اختر المرحلة', text: 'ابدأ من مستوى مناسب لعمر الطفل والموقف المطلوب.' },
  { icon: FileSearch, title: 'افهم الموقف', text: 'شاهد القصة القصيرة وحدد ما الذي يحدث حولك.' },
  { icon: ListChecks, title: 'اتخذ القرار', text: 'اختر من بين بدائل واضحة داخل اللعبة.' },
  { icon: CheckCircle2, title: 'تعلّم التصرف الآمن', text: 'تعرف على التصرف الصحيح وكررّه بثقة.' },
] as const;

export const JourneySection = () => {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-10 sm:py-14">
      <div className="mb-8 text-right">
        <p className="text-sm font-bold uppercase tracking-[0.34em] text-sky-700/70">كيف تبدأ رحلة السلامة؟</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">رحلة مرئية وخطواتها واضحة</h2>
      </div>

      <div className="journey-panel relative rounded-[2.5rem] border border-sky-100 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
        <div className="journey-route absolute inset-x-8 top-1/2 hidden h-[2px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,#0ea5e9_12%,#38bdf8_35%,#facc15_62%,transparent_95%)] lg:block" />
        <div className="journey-route-mobile absolute right-7 top-8 bottom-8 hidden w-[2px] rounded-full bg-[linear-gradient(180deg,transparent,#0ea5e9_12%,#38bdf8_35%,#facc15_62%,transparent_95%)] sm:block lg:hidden" />

        <div className="grid gap-4 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className={`journey-step relative rounded-[1.8rem] border border-white/85 bg-white/95 p-5 text-right shadow-[0_16px_40px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(14,165,233,0.16)] ${visible ? 'animate-card-rise' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(96,165,250,0.26))] text-sky-700 shadow-[0_12px_24px_rgba(14,165,233,0.10)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mb-4 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">0{index + 1}</div>
                <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="mt-3 leading-8 text-slate-600">{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};