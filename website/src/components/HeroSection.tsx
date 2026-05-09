import { AlertTriangle, Heart, MapPin, MessageCircle, Play, Shield, Sparkles, Star } from 'lucide-react';
import { useReveal } from './useReveal';

const floatingIcons = [
  { icon: Shield, className: 'top-8 right-3 animate-float-slow' },
  { icon: Star, className: 'top-16 left-3 animate-float-medium' },
  { icon: MessageCircle, className: 'bottom-16 right-8 animate-float-slower' },
  { icon: AlertTriangle, className: 'bottom-28 left-10 animate-float-medium' },
  { icon: MapPin, className: 'top-1/2 right-10 animate-float-slow' },
  { icon: Heart, className: 'bottom-10 left-8 animate-float-slower' },
] as const;

export const HeroSection = () => {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section id="الرئيسية" ref={ref} className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
      <div className={`${visible ? 'animate-rise-in' : 'opacity-0 translate-y-6'} text-right`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-800 shadow-[0_10px_30px_rgba(14,165,233,0.09)] backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          لعبة تعليم السلامة للأطفال
        </span>

        <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
          تعلّم السلامة من خلال مغامرة <span className="bg-gradient-to-l from-sky-600 via-cyan-500 to-slate-800 bg-clip-text text-transparent">تفاعلية</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600 sm:text-xl">
          YouSafe تساعد الأطفال على فهم مواقف السلامة اليومية من خلال مراحل ممتعة، بطل شجاع، ومساعد ذكي يشرح لهم خطوة بخطوة.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
          <button type="button" className="hero-button inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(14,165,233,0.26)] transition duration-300">
            ابدأ المغامرة
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-full border border-sky-100 bg-white/85 px-7 py-4 text-base font-bold text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-white">
            <Play className="ml-2 h-4 w-4" />
            شاهد فكرة اللعبة
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 text-sm font-semibold text-slate-700">
          {['مراحل تفاعلية', 'إرشاد ذكي', 'تعلّم آمن'].map((item) => (
            <div key={item} className="rounded-full border border-sky-100 bg-white/75 px-4 py-2 shadow-[0_10px_26px_rgba(15,23,42,0.04)] backdrop-blur-md">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className={`${visible ? 'animate-hero-pop' : 'opacity-0 translate-y-6'} relative`}>
        <div className="relative mx-auto flex max-w-xl items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.18),transparent_60%)] blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-100 bg-white/60 shadow-[0_20px_70px_rgba(14,165,233,0.10)] backdrop-blur-2xl sm:h-[33rem] sm:w-[33rem]" />
          <div className="absolute left-1/2 top-1/2 h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/70 bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(240,249,255,0.6)_48%,rgba(14,165,233,0.08)_100%)] sm:h-[28rem] sm:w-[28rem]" />
          <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky-300/60 sm:h-[22rem] sm:w-[22rem] animate-rotate-slow" />
          <div className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-200/60 sm:h-[18rem] sm:w-[18rem] animate-rotate-slower-reverse" />

          <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-6">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(240,249,255,0.88)_58%,rgba(224,242,254,0.85)_100%)] p-4 sm:p-6">
              <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-sky-300/20 blur-3xl" />
              <div className="absolute bottom-2 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-amber-200/30 blur-2xl" />

              <div className="relative mx-auto flex aspect-square max-w-[25rem] items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0.2)_58%,rgba(14,165,233,0.05)_100%)] p-5 shadow-[inset_0_0_50px_rgba(255,255,255,0.5)]">
                <div className="absolute inset-3 rounded-full border border-sky-200/70 shadow-[0_0_0_8px_rgba(255,255,255,0.18)]" />
                <div className="absolute inset-9 rounded-full border border-amber-200/60 animate-ring-pulse" />
                <div className="absolute inset-14 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.15),transparent_62%)]" />

                {floatingIcons.map(({ icon: Icon, className }) => (
                  <div key={className} className={`absolute flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/90 text-sky-700 shadow-[0_12px_30px_rgba(14,165,233,0.12)] ${className}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                ))}

                <div className="absolute -right-3 top-10 animate-float-slower rounded-2xl border border-sky-100 bg-white/95 px-4 py-3 text-right shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-md">
                  <p className="text-xs font-semibold text-slate-500">المهمة الحالية</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">السلامة في الشارع</p>
                  <p className="mt-1 text-xs text-emerald-600">الحالة: جاهزة للبدء</p>
                </div>

                <img src="/mascot.png" alt="شخصية الغزال البطل في YouSafe" className="relative z-10 max-h-[24rem] w-auto animate-mascot-float object-contain drop-shadow-[0_24px_55px_rgba(15,23,42,0.18)] sm:max-h-[29rem]" />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-2 top-14 hidden h-14 w-14 rounded-full border border-sky-200/60 bg-white/80 shadow-[0_10px_25px_rgba(14,165,233,0.08)] lg:block" />
          <div className="pointer-events-none absolute bottom-16 left-0 hidden h-10 w-10 rounded-full border border-amber-200/70 bg-white/90 shadow-[0_10px_25px_rgba(251,191,36,0.08)] lg:block" />
        </div>
      </div>
    </section>
  );
};
