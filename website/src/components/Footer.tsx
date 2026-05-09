export const Footer = () => {
  return (
    <footer className="border-t border-sky-100 pt-8 pb-6 text-right sm:pt-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <img src="/logo.png" alt="شعار YouSafe" className="h-10 w-auto" />
          <p className="mt-4 max-w-xl leading-8 text-slate-600">YouSafe لعبة تعليمية تساعد الأطفال على تعلّم السلامة بطريقة ممتعة وآمنة.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:justify-items-end">
          <div className="flex flex-wrap justify-end gap-3 text-sm font-semibold text-slate-700">
            {['الرئيسية', 'عن اللعبة', 'المساعد الذكي'].map((item) => (
              <span key={item} className="rounded-full border border-sky-100 bg-white/90 px-4 py-2 shadow-sm">
                {item}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500">© 2026 YouSafe. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};
