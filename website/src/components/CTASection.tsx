export const CTASection = () => {
  return (
    <section id="الانطلاق" className="py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-[2.75rem] border border-sky-100 bg-[linear-gradient(135deg,#ecfeff_0%,#eef6ff_38%,#fff7e8_100%)] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(250,204,21,0.16),transparent_25%),radial-gradient(circle_at_70%_85%,rgba(16,185,129,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl animate-bg-drift" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-36 w-36 rounded-full bg-amber-200/35 blur-3xl animate-bg-drift-slower" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="text-right">
            <p className="text-sm font-bold uppercase tracking-[0.34em] text-sky-700/70">جاهز تبدأ مغامرة YouSafe؟</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">رحلة ممتعة يتعلّم فيها الطفل مهارات السلامة</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-600">ابدأ رحلة ممتعة يتعلّم فيها الطفل مهارات السلامة من خلال اللعب والإرشاد الذكي.</p>
          </div>

          <div className="flex justify-end gap-3 sm:gap-4">
            <button type="button" className="hero-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_16px_40px_rgba(14,165,233,0.26)]">
              ابدأ الآن
            </button>
          </div>
        </div>

        <div className="relative mt-8 flex items-center justify-end gap-4">
          <img src="/logo.png" alt="شعار YouSafe" className="h-10 w-auto sm:h-12" />
          <img src="/image.png" alt="عنصر زخرفي من هوية YouSafe" className="h-12 w-auto opacity-90 sm:h-14" />
        </div>
      </div>
    </section>
  );
};
