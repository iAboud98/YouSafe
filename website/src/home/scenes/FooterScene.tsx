import { ChevronUp, Mail, Phone } from 'lucide-react';

type SceneProps = {
  active: boolean;
  reducedMotion: boolean;
  onBackToTop?: () => void;
};

export const FooterScene = ({ active, reducedMotion, onBackToTop }: SceneProps) => {
  return (
    <div className="min-h-[calc(84vh-8rem)] text-right">
      <div className={`${active ? (reducedMotion ? 'opacity-100' : 'animate-rise-in') : 'opacity-0 translate-y-6'} rounded-[2.4rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(84,68,45,0.10)] backdrop-blur-xl sm:p-8`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <img src="/logo.png" alt="شعار YouSafe" className="h-10 w-auto" />
            <p className="mt-4 max-w-2xl text-lg leading-9 text-slate-600">
              YouSafe لعبة تعليمية تساعد الأطفال على تعلّم السلامة بطريقة ممتعة وآمنة.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:justify-items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">الروابط</p>
              <div className="mt-3 flex flex-wrap justify-end gap-3 text-sm font-semibold text-slate-700">
                {['الرئيسية', 'فكرة اللعبة', 'مراحل السلامة', 'المساعد الذكي'].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">تواصل معنا</p>
              <div className="mt-3 flex flex-wrap justify-end gap-3 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  <Mail className="h-4 w-4 text-sky-700" />
                  البريد الإلكتروني
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  <Phone className="h-4 w-4 text-sky-700" />
                  الدعم
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <p>© 2026 YouSafe. جميع الحقوق محفوظة.</p>
          <button type="button" onClick={onBackToTop} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50">
            <ChevronUp className="h-4 w-4" />
            العودة للأعلى
          </button>
        </div>
      </div>
    </div>
  );
};
