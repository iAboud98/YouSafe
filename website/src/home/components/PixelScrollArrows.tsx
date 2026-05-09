type PixelScrollArrowsProps = {
  accent: string;
  active: boolean;
  reducedMotion: boolean;
  onClick: () => void;
};

export const PixelScrollArrows = ({ accent, active, reducedMotion, onClick }: PixelScrollArrowsProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-end gap-10 transition-transform hover:scale-110 ${active ? 'kinetic-fade' : 'opacity-0'}`}
    style={{ animationDelay: '1100ms', background: 'transparent', border: 'none' }}
  >
    {[0, 1, 2].map((group) => (
      <div key={group} className="flex flex-col items-center gap-1">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="24"
            height="14"
            viewBox="0 0 28 16"
            fill="none"
            className={reducedMotion ? '' : 'pixel-scroll-arrow'}
            style={{
              animationDelay: `${group * 150 + i * 200}ms`,
              opacity: reducedMotion ? 1 - i * 0.3 : undefined,
              imageRendering: 'pixelated',
            }}
          >
            <path
              d="M2 2 L14 12 L26 2"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        ))}
      </div>
    ))}
  </button>
);
