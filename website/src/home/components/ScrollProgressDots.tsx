type ScrollProgressDotsProps = {
  items: Array<{ id: string; label: string }>;
  activeIndex: number;
  onNavigate: (id: string) => void;
  accent: string;
};

export const ScrollProgressDots = ({ items, activeIndex, onNavigate, accent }: ScrollProgressDotsProps) => {
  return (
    <aside
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
      style={{ direction: 'ltr' }}
    >
      {/* Vertical container — pixel lives track */}
      <div
        className="flex flex-col items-center gap-0 py-2 px-1.5"
        style={{
          background: 'rgba(4,2,10,0.70)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '2px',
          backdropFilter: 'blur(12px)',
        }}
      >
        {items.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center justify-center py-1 outline-none"
              aria-label={`الانتقال إلى ${item.label}`}
              aria-current={active ? 'true' : undefined}
            >
              <span
                className="block transition-all duration-500 ease-out"
                style={{
                  width: '6px',
                  height: active ? '20px' : '6px',
                  background: active ? accent : 'rgba(255,255,255,0.18)',
                  boxShadow: active ? `0 0 8px ${accent}99` : 'none',
                  borderRadius: '1px',
                }}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};
