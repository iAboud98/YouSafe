import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const talkButtonStyles = `
  @keyframes talkGlow {
    0%, 100% {
      box-shadow: 0 0 12px rgba(191, 95, 255, 0.35), 0 0 30px rgba(191, 95, 255, 0.20);
    }
    50% {
      box-shadow: 0 0 24px rgba(191, 95, 255, 0.65), 0 0 40px rgba(191, 95, 255, 0.35);
    }
  }
  .talk-button {
    animation: talkGlow 2.5s ease-in-out infinite;
  }
`;

type NavItem = { id: string; label: string };

type GlobalNavbarProps = {
  items: NavItem[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  onTalk?: () => void;
  accent: string;
};

export const GlobalNavbar = ({ items, activeIndex, onNavigate, onTalk, accent }: GlobalNavbarProps) => {
  const accentMuted = `${accent}2e`;
  const accentSoft = `${accent}38`;
  const talkGradient = 'linear-gradient(90deg, #ffd7ed 0%, #ffb0de 40%, #df7dff 100%)';
  const talkShadow = '0 8px 24px rgba(191, 95, 255, 0.25), 0 4px 0 rgba(0,0,0,0.18)';
  const talkShadowHover = '0 10px 30px rgba(191, 95, 255, 0.35), 0 4px 0 rgba(0,0,0,0.18)';
  const talkShadowPressed = '0 2px 6px rgba(191, 95, 255, 0.2), 0 1px 0 rgba(0,0,0,0.15)';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeIndex]);

  return (
    <>
      <style>{talkButtonStyles}</style>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1680px] items-center gap-4">
        {/* ── Logo — outside the navbar bar ── */}
        <button
          type="button"
          onClick={() => onNavigate(0)}
          aria-label="الانتقال إلى الرئيسية"
          className="group relative flex shrink-0 items-center justify-center transition-transform duration-150 hover:scale-105"
          style={{ background: 'transparent', border: 'none', height: '100px', width: '100px' }}
        >
          <img
            src="/New_Logo.png"
            alt="شعار YouSafe"
            className="h-full w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          />
        </button>

        {/* ── Navbar bar ── */}
        <div
          className="flex flex-1 items-center justify-between gap-3 px-4 py-2.5"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
            border: `1px solid ${accentMuted}`,
            borderRadius: '12px',
            boxShadow: `0 6px 22px ${accentSoft}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
          }}
        >
        {/* ── Nav links ── */}
        <div className="flex items-center gap-4">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            {items.map((item, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(index)}
                  aria-current={active ? 'true' : undefined}
                  className="relative px-3 py-1.5 text-[13px] font-semibold font-cartoon transition-colors duration-150"
                  style={{
                    color: active ? accent : '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.color = accent;
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                  }}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 transition-all duration-200"
                    style={{
                      bottom: '-2px',
                      height: '2px',
                      width: active ? '60%' : '0%',
                      background: accent,
                      borderRadius: '2px',
                      boxShadow: active ? `0 0 6px ${accent}` : 'none',
                    }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Talk button — pixel-art game style */}
          {onTalk && (
            <button
              type="button"
              onClick={onTalk}
              aria-label="احكي مع يوسف"
              className="talk-button hidden items-center gap-2 sm:inline-flex font-cartoon font-bold transition-all duration-150"
              style={{
                background: talkGradient,
                border: '1px solid rgba(0,0,0,0.20)',
                boxShadow: talkShadow,
                borderRadius: '12px',
                color: '#1a1a1a',
                fontSize: '14px',
                letterSpacing: '0.08em',
                padding: '10px 18px',
                textShadow: '0 1px 1px rgba(255,255,255,0.6)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = talkShadowHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = '';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = talkShadow;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(4px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = talkShadowPressed;
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = talkShadowHover;
              }}
            >
              ▶&nbsp;احكي مع يوسف
            </button>
          )}
        </div>

        {/* ── Right: CTA + mobile menu ── */}
        <div className="flex items-center gap-3">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => onNavigate(items.length - 1)}
            className="hidden px-4 py-2 text-[12px] font-bold font-cartoon transition-all duration-150 hover:brightness-105 sm:inline-flex"
            style={{
              background: '#F7C948',
              border: '1px solid #D6A82E',
              boxShadow: '0 2px 8px rgba(247,201,72,0.35)',
              borderRadius: '999px',
              color: '#202544',
            }}
          >
            ابدأ المغامرة
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center transition xl:hidden"
            style={{
              background: `${accent}14`,
              border: `1px solid ${accentMuted}`,
              borderRadius: '10px',
              color: accent,
            }}
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`mx-auto mt-1 overflow-hidden transition-all duration-300 xl:hidden ${
          open ? 'max-h-[32rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div
          className="p-2"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${accentMuted}`,
            borderRadius: '12px',
            boxShadow: `0 16px 40px ${accentSoft}`,
          }}
        >
          <div className="flex flex-col gap-1">
            {items.map((item, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigate(index);
                  }}
                  className="px-4 py-3 text-right text-sm font-semibold font-cartoon transition-all"
                  style={{
                    borderRadius: '10px',
                    ...(active
                      ? {
                          background: `${accent}1a`,
                          color: accent,
                          border: `1px solid ${accentSoft}`,
                        }
                      : {
                          color: 'rgba(32,37,68,0.75)',
                          border: '1px solid transparent',
                        }),
                  }}
                >
                  {item.label}
                </button>
              );
            })}
            {onTalk && (
              <button
                type="button"
                onClick={() => { setOpen(false); onTalk(); }}
                className="talk-button mt-1 px-4 py-3 text-right text-sm font-bold font-cartoon transition-all"
                style={{
                  borderRadius: '12px',
                  background: talkGradient,
                  color: '#1a1a1a',
                  border: '1px solid rgba(0,0,0,0.20)',
                  boxShadow: talkShadow,
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  textShadow: '0 1px 1px rgba(255,255,255,0.6)',
                }}
              >
                ▶ احكي انو منيحة
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
};
