import { Bot, Sparkles } from 'lucide-react';
import { useReveal } from './useReveal';

export const AssistantPreview = () => {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="المساعد-الذكي" className="py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className={`${visible ? 'animate-rise-in' : 'opacity-0 translate-y-6'} text-right`}>
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-sky-700/70">مساعدك الذكي داخل المغامرة</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">إرشاد هادئ، بسيط، ومشجّع</h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-600">يساعد المساعد الذكي الطفل على فهم المرحلة، الإجابة على الأسئلة، واختيار التصرف الآمن بطريقة بسيطة ومشجعة.</p>
        </div>

        <div className="assistant-card relative overflow-hidden rounded-[2.4rem] border border-sky-100 bg-white/90 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.10),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(250,204,21,0.12),transparent_22%)]" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(250,204,21,0.20))] text-sky-700 shadow-[0_12px_28px_rgba(14,165,233,0.10)]">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">مساعد YouSafe</p>
                <p className="text-xs text-slate-500">يظهر داخل المغامرة عند الحاجة</p>
              </div>
            </div>
            <div className="animate-float-slow rounded-full border border-sky-100 bg-white px-3 py-2 text-sky-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>

          <div className="relative mt-6 space-y-4 text-right">
            <div className={`${visible ? 'bubble-in bubble-delay-1' : 'opacity-0 translate-y-4'} max-w-xl rounded-[1.5rem] rounded-tr-md border border-sky-100 bg-sky-50 px-5 py-4 text-slate-800 shadow-[0_12px_30px_rgba(14,165,233,0.08)]`}>
              مرحبًا! أنا هنا لأساعدك في هذه المرحلة.
            </div>
            <div className={`${visible ? 'bubble-in bubble-delay-2' : 'opacity-0 translate-y-4'} mr-auto max-w-lg rounded-[1.5rem] rounded-tl-md border border-white bg-white px-5 py-4 text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)]`}>
              ماذا أفعل أولًا؟
            </div>
            <div className={`${visible ? 'bubble-in bubble-delay-3' : 'opacity-0 translate-y-4'} max-w-xl rounded-[1.5rem] rounded-tr-md border border-emerald-100 bg-emerald-50 px-5 py-4 text-slate-800 shadow-[0_12px_30px_rgba(34,197,94,0.08)]`}>
              انظر حولك، ابقَ هادئًا، واختر التصرف الأكثر أمانًا.
            </div>

            <div className="mt-5 flex items-center gap-2 text-slate-500">
              <span className="typing-dot" />
              <span className="typing-dot typing-dot-delay-1" />
              <span className="typing-dot typing-dot-delay-2" />
              <span className="mr-2 text-sm font-medium">يكتب الآن...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
