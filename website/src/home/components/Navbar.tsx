import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type NavbarProps = {
  activeLabel: string;
  onNavigate: (id: string) => void;
  links: Array<{ label: string; id: string }>;
};

export const Navbar = ({ activeLabel, onNavigate, links }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-4 z-40 ${solid ? 'nav-solid' : ''}`}>
      <div className="rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-[0_16px_40px_rgba(84,68,45,0.09)] backdrop-blur-xl sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <button type="button" className="shrink-0" onClick={() => onNavigate('الرئيسية')} aria-label="الانتقال إلى الرئيسية">
            <img src="/logo.png" alt="شعار YouSafe" className="h-9 w-auto sm:h-10" />
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`nav-link rounded-full px-4 py-2 text-sm font-semibold transition ${activeLabel === link.label ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('الانطلاق')}
              className="hidden rounded-full bg-[linear-gradient(135deg,#f3d38b_0%,#7dd3fc_48%,#2563eb_100%)] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(14,165,233,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(14,165,233,0.22)] sm:inline-flex"
            >
              ابدأ المغامرة
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:bg-white lg:hidden"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              onClick={() => setOpen((state) => !state)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`${open ? 'mt-4 max-h-80 opacity-100' : 'pointer-events-none max-h-0 opacity-0'} overflow-hidden transition-all duration-300 lg:hidden`}>
          <div className="rounded-[1.75rem] border border-slate-100 bg-white/95 p-3 shadow-[0_16px_36px_rgba(84,68,45,0.08)]">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigate(link.id);
                  }}
                  className="rounded-2xl px-4 py-3 text-right text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-slate-950"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onNavigate('الانطلاق');
                }}
                className="rounded-2xl bg-[linear-gradient(135deg,#f3d38b_0%,#7dd3fc_48%,#2563eb_100%)] px-4 py-3 text-sm font-bold text-slate-950"
              >
                ابدأ المغامرة
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
