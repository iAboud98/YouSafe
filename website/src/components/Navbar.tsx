import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { label: 'الرئيسية', href: '#الرئيسية' },
  { label: 'عن اللعبة', href: '#عن-اللعبة' },
  { label: 'المساعد الذكي', href: '#المساعد-الذكي' },
] as const;

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-3 z-50">
      <div className={`glass-nav ${scrolled ? 'glass-nav-solid' : ''} animate-page-in rounded-full border px-4 py-3 sm:px-5`}>
        <div className="flex items-center justify-between gap-4">
          <a href="#الرئيسية" className="flex items-center gap-3">
            <img src="/logo.png" alt="شعار YouSafe" className="h-10 w-auto sm:h-11" />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="nav-link rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:text-slate-950">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#الانطلاق" className="hidden rounded-full bg-[linear-gradient(135deg,#0f766e_0%,#0ea5e9_52%,#2563eb_100%)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_40px_rgba(14,165,233,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(14,165,233,0.32)] sm:inline-flex">
              ابدأ المغامرة
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-100 bg-white/85 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white md:hidden"
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`${open ? 'mt-4 max-h-72 opacity-100' : 'pointer-events-none max-h-0 opacity-0'} overflow-hidden transition-all duration-300 md:hidden`}>
          <div className="rounded-[1.8rem] border border-sky-100 bg-white/90 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-slate-950"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#الانطلاق" className="rounded-2xl bg-[linear-gradient(135deg,#0f766e_0%,#0ea5e9_52%,#2563eb_100%)] px-4 py-3 text-center text-sm font-bold text-white" onClick={() => setOpen(false)}>
                ابدأ المغامرة
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
