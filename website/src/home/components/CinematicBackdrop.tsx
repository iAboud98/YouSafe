import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CherrySprite,
  CoinSprite,
  ControllerSprite,
  GhostSprite,
  HeartSprite,
  InvaderSprite,
  MushroomSprite,
  PacManSprite,
  PixelDust,
  StarSprite,
} from './ArcadeSprites';
import type { SceneTheme } from '../types';

type CinematicBackdropProps = {
  theme: SceneTheme;
  reducedMotion: boolean;
  /** When false, skips the arcade photo wallpaper (flat scene gradient base only). */
  showWallpaper?: boolean;
};

/**
 * Drifting pixel-art sprites positioned at the edges/corners so they decorate
 * the screen without competing with foreground text. Each sprite has its own
 * floating motion and a glow that picks up the active theme accent.
 */
const PixelSpriteLayer = ({ accent }: { accent: string }) => {
  const dropShadow = (color: string, blur = 6) =>
    `drop-shadow(0 0 ${blur}px ${color}) drop-shadow(2px 2px 0 rgba(0,0,0,0.7))`;

  return (
    <>
      {/* Top-left: ghost sliding horizontally */}
      <div
        className="pointer-events-none absolute left-[3%] top-[14%] ghost-slide opacity-[0.55]"
        style={{ filter: dropShadow('rgba(255,17,119,0.55)', 10) }}
      >
        <GhostSprite size={42} color="#ff1177" />
      </div>

      {/* Top-right: Pac-Man chasing */}
      <div
        className="pointer-events-none absolute right-[6%] top-[12%] sprite-drift-a opacity-[0.65]"
        style={{ filter: dropShadow('rgba(255,215,0,0.6)', 10) }}
      >
        <PacManSprite size={44} color="#ffd700" />
      </div>

      {/* Upper-mid: invader marching */}
      <div
        className="pointer-events-none absolute left-[16%] top-[26%] invader-march opacity-[0.55]"
        style={{ filter: dropShadow('rgba(57,255,20,0.55)', 9) }}
      >
        <InvaderSprite size={36} color="#39ff14" />
      </div>

      {/* Right-mid: another ghost (cyan) */}
      <div
        className="pointer-events-none absolute right-[3%] top-[42%] ghost-slide opacity-[0.5]"
        style={{ animationDelay: '1.4s', filter: dropShadow('rgba(0,229,255,0.55)', 10) }}
      >
        <GhostSprite size={38} color="#00e5ff" />
      </div>

      {/* Left-mid: cherry */}
      <div
        className="pointer-events-none absolute left-[5%] top-[52%] sprite-drift-b opacity-[0.6]"
        style={{ filter: dropShadow('rgba(255,17,119,0.55)', 8) }}
      >
        <CherrySprite size={34} color="#ff1177" />
      </div>

      {/* Right-mid lower: mushroom power-up */}
      <div
        className="pointer-events-none absolute right-[12%] top-[58%] sprite-drift-a opacity-[0.55]"
        style={{ animationDelay: '0.7s', filter: dropShadow('rgba(255,17,119,0.5)', 8) }}
      >
        <MushroomSprite size={38} color="#ff1177" />
      </div>

      {/* Bottom-left: NES controller */}
      <div
        className="pointer-events-none absolute bottom-[12%] left-[7%] sprite-drift-b opacity-[0.45]"
        style={{ animationDelay: '2.1s', filter: dropShadow('rgba(255,255,255,0.25)', 6) }}
      >
        <ControllerSprite size={56} color="#9b9b9b" />
      </div>

      {/* Bottom-right: heart */}
      <div
        className="pointer-events-none absolute bottom-[16%] right-[6%] sprite-drift-a opacity-[0.6]"
        style={{ animationDelay: '0.4s', filter: dropShadow('rgba(255,17,119,0.6)', 8) }}
      >
        <HeartSprite size={32} color="#ff1177" />
      </div>

      {/* Bottom-center area: invader squad */}
      <div
        className="pointer-events-none absolute bottom-[8%] left-[42%] invader-march opacity-[0.5]"
        style={{ animationDelay: '1s', filter: dropShadow('rgba(191,95,255,0.5)', 8) }}
      >
        <InvaderSprite size={28} color="#bf5fff" />
      </div>

      {/* Top-mid star (theme-tinted) */}
      <div
        className="pointer-events-none absolute left-[34%] top-[8%] twinkle opacity-[0.55]"
        style={{ filter: dropShadow(accent, 8) }}
      >
        <StarSprite size={22} color={accent} />
      </div>

      {/* Right-top star */}
      <div
        className="pointer-events-none absolute right-[28%] top-[18%] twinkle twinkle-delay-2 opacity-[0.55]"
        style={{ filter: dropShadow('rgba(255,215,0,0.6)', 7) }}
      >
        <StarSprite size={16} color="#ffd700" />
      </div>

      {/* Bottom-mid star */}
      <div
        className="pointer-events-none absolute bottom-[28%] left-[38%] twinkle twinkle-delay-3 opacity-[0.45]"
        style={{ filter: dropShadow(accent, 6) }}
      >
        <StarSprite size={14} color={accent} />
      </div>

      {/* Tiny coin scattered */}
      <div
        className="pointer-events-none absolute right-[36%] bottom-[32%] sprite-drift-b opacity-[0.55]"
        style={{ filter: dropShadow('rgba(255,215,0,0.55)', 7) }}
      >
        <CoinSprite size={20} color="#ffd700" />
      </div>
    </>
  );
};

/**
 * Coins floating up from the bottom of the screen, like an arcade pickup
 * cascade. Positions are randomized once and persist for the lifetime of the
 * component to avoid jarring re-shuffles.
 */
const CoinRainLayer = () => {
  const coins = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        left: `${(i * 11 + ((i * 47) % 9)) % 96 + 2}%`,
        delay: `${(i * 1.6) % 13}s`,
        duration: `${11 + ((i * 7) % 6)}s`,
        size: 14 + ((i * 5) % 12),
        accent: i % 3 === 0 ? '#ff1177' : i % 3 === 1 ? '#ffd700' : '#39ff14',
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((c, i) => (
        <div
          key={i}
          className="absolute bottom-0 coin-rise"
          style={{
            left: c.left,
            animationDelay: c.delay,
            animationDuration: c.duration,
            filter: `drop-shadow(0 0 6px ${c.accent}) drop-shadow(2px 2px 0 rgba(0,0,0,0.6))`,
          }}
        >
          <CoinSprite size={c.size} color={c.accent} />
        </div>
      ))}
    </div>
  );
};

/**
 * A field of tiny pixel dust falling diagonally through the scene — adds the
 * sense of arcade dust motes / stars without competing with the larger sprites.
 */
const PixelDustLayer = () => {
  const dust = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: `${(i * 13 + 5) % 100}%`,
        delay: `${(i * 0.9) % 18}s`,
        duration: `${14 + ((i * 3) % 12)}s`,
        size: 3 + (i % 4),
        opacity: 0.25 + ((i % 5) * 0.1),
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dust.map((d, i) => (
        <div
          key={i}
          className="absolute pixel-rain"
          style={{
            left: d.left,
            top: 0,
            animationDelay: d.delay,
            animationDuration: d.duration,
            opacity: d.opacity,
          }}
        >
          <PixelDust size={d.size} color="#202544" />
        </div>
      ))}
    </div>
  );
};

export const CinematicBackdrop = ({ theme, reducedMotion, showWallpaper = true }: CinematicBackdropProps) => {
  const [layers, setLayers] = useState<{ a: SceneTheme; b: SceneTheme; topIsA: boolean }>({
    a: theme,
    b: theme,
    topIsA: true,
  });

  // Mouse parallax — applied to the wallpaper for a subtle 3D effect
  const wallpaperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (reducedMotion || !showWallpaper) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const el = wallpaperRef.current;
      if (!el) return;
      el.style.setProperty('--wp-px', `${x * -10}px`);
      el.style.setProperty('--wp-py', `${y * -8}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion, showWallpaper]);

  useEffect(() => {
    setLayers((prev) => {
      if (prev.topIsA && prev.a === theme) return prev;
      if (!prev.topIsA && prev.b === theme) return prev;
      return prev.topIsA
        ? { a: prev.a, b: theme, topIsA: false }
        : { a: theme, b: prev.b, topIsA: true };
    });
  }, [theme]);

  /**
   * The colored gradient is rendered at ~78% opacity so the arcade wallpaper
   * underneath can bleed through and tint with the active scene's accent.
   */
  const renderGradientLayer = (layerTheme: SceneTheme, visible: boolean, key: string) => (
    <div
      key={key}
      className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
        visible ? 'opacity-[0.14]' : 'opacity-0'
      }`}
      style={{ background: layerTheme.backdrop, mixBlendMode: 'multiply' }}
    >
      {/* Accent radial glow — top-left and bottom-right corners */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 8% 12%, ${layerTheme.glow} 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 92% 88%, ${layerTheme.glow} 0%, transparent 55%)
          `,
        }}
      />
    </div>
  );

  const activeTheme = layers.topIsA ? layers.a : layers.b;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── Layer 0 · Arcade hero wallpaper OR flat base (no photo) ── */}
      {showWallpaper ? (
        <div
          ref={wallpaperRef}
          className="absolute inset-0"
          style={{
            transform: 'translate3d(var(--wp-px, 0px), var(--wp-py, 0px), 0)',
            transition: 'transform 600ms cubic-bezier(0.2, 0.7, 0.3, 1)',
          }}
        >
          <div
            className={`absolute inset-0 ${reducedMotion ? '' : 'arcade-hero-bg'}`}
            style={{
              opacity: 0.54,
              mixBlendMode: 'multiply',
              ...(reducedMotion
                ? {
                    backgroundImage: "url('/arcade-hero-bg.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scale(1.15)',
                  }
                : {}),
            }}
          />
          {/* Sky-blue right-side wash — keeps Arabic text readable, tinted to match the new undertone. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to left, rgba(245,247,251,0.08) 0%, rgba(245,247,251,0.04) 45%, rgba(245,247,251,0.01) 80%, rgba(245,247,251,0) 100%)',
            }}
          />
          <div className="absolute inset-0 arcade-vignette" />
        </div>
      ) : (
        <div className="absolute inset-0" style={{ background: theme.backdrop }} aria-hidden />
      )}

      {/* ── Layer 1 · Very light sky-blue tint — much thinner now so the
          wallpaper photo shows through and the page reads as a real photo
          rather than a flat color wash. ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(245, 247, 251, 0.028)' }}
      />

      {/* ── Layer 2 · Per-scene gradient (multiplied over wallpaper) ── */}
      {renderGradientLayer(layers.a, layers.topIsA, 'a')}
      {renderGradientLayer(layers.b, !layers.topIsA, 'b')}

      {/* ── Layer 3 · Brick wall texture — top 35% (dark lines for light mode) ── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '35%',
          backgroundImage: `
            repeating-linear-gradient(
              180deg,
              rgba(32,37,68,0.06) 0px,
              rgba(32,37,68,0.06) 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(32,37,68,0.045) 0px,
              rgba(32,37,68,0.045) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />
      {/* Offset row for staggered brick effect */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '35%',
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(32,37,68,0.04) 0px,
              rgba(32,37,68,0.04) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
          backgroundPosition: '20px 10px',
        }}
      />

      {/* ── Layer 4 · Arcade floor grid — bottom 28% (dark lines for light mode) ── */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '28%',
          backgroundImage: `
            linear-gradient(rgba(32,37,68,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(32,37,68,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Layer 5 · Halftone & CRT scanlines (subtle on cream) ── */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(rgba(32,37,68,0.45) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(32,37,68,0.06) 3px, rgba(32,37,68,0.06) 4px)',
        }}
      />

      {/* ── Layer 6 · Neon edge glow strips ── */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${activeTheme.accent}aa, transparent)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${activeTheme.accent}66, transparent)`,
        }}
      />

      {/* ── Layer 7 · Atmospheric glow blobs ── */}
      <div
        className={`absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full opacity-[0.22] blur-3xl ${
          reducedMotion ? '' : 'blob-drift'
        }`}
        style={{ background: `radial-gradient(circle, ${activeTheme.glow}, transparent 65%)` }}
      />
      <div
        className={`absolute -right-28 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-[0.18] blur-3xl ${
          reducedMotion ? '' : 'blob-drift-reverse'
        }`}
        style={{ background: `radial-gradient(circle, ${activeTheme.glow}, transparent 65%)` }}
      />
      <div
        className={`absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl ${
          reducedMotion ? '' : 'blob-drift'
        }`}
        style={{ background: activeTheme.accent }}
      />

      {/* ── Layer 8 · Pixel-art sprite cliparts ── */}
      {!reducedMotion && <PixelSpriteLayer accent={activeTheme.accent} />}

      {/* ── Layer 9 · Atmospheric pixel dust ── */}
      {!reducedMotion && <PixelDustLayer />}

      {/* ── Layer 10 · Coin rain pickups ── */}
      {!reducedMotion && <CoinRainLayer />}
    </div>
  );
};
