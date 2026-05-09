/**
 * Hand-crafted pixel-art sprites rendered as inline SVG.
 *
 * Each sprite uses a small viewBox (≈12-16px) with `image-rendering: pixelated`
 * so it stays crisp at any size. They are intentionally sparse on detail so
 * they read clearly even at 16-24px in a backdrop.
 *
 * All sprites accept `size` (px), `color` (overrides primary fill), and
 * standard svg props for positioning.
 */

import type { CSSProperties, SVGProps } from 'react';

const pixelStyle: CSSProperties = {
  imageRendering: 'pixelated',
  shapeRendering: 'crispEdges',
  display: 'block',
};

type SpriteProps = {
  size?: number;
  color?: string;
} & Omit<SVGProps<SVGSVGElement>, 'color'>;

/* ─── PAC-MAN — yellow disc with a wedge ─────────────────────────────── */
export const PacManSprite = ({ size = 24, color = '#ffd700', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 14 14"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    {/* body */}
    <rect x="3" y="1" width="8" height="1" fill={color} />
    <rect x="2" y="2" width="10" height="1" fill={color} />
    <rect x="1" y="3" width="12" height="1" fill={color} />
    <rect x="1" y="4" width="11" height="1" fill={color} />
    <rect x="1" y="5" width="9"  height="1" fill={color} />
    <rect x="1" y="6" width="7"  height="1" fill={color} />
    <rect x="1" y="7" width="9"  height="1" fill={color} />
    <rect x="1" y="8" width="11" height="1" fill={color} />
    <rect x="1" y="9" width="12" height="1" fill={color} />
    <rect x="2" y="10" width="10" height="1" fill={color} />
    <rect x="3" y="11" width="8"  height="1" fill={color} />
    {/* eye */}
    <rect x="7" y="3" width="1" height="1" fill="#0a0008" />
  </svg>
);

/* ─── GHOST — Blinky / Pinky / Inky / Clyde ──────────────────────────── */
export const GhostSprite = ({ size = 24, color = '#ff1177', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 14 14"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    {/* dome */}
    <rect x="4" y="1" width="6" height="1" fill={color} />
    <rect x="3" y="2" width="8" height="1" fill={color} />
    <rect x="2" y="3" width="10" height="1" fill={color} />
    <rect x="1" y="4" width="12" height="1" fill={color} />
    <rect x="1" y="5" width="12" height="1" fill={color} />
    <rect x="1" y="6" width="12" height="1" fill={color} />
    <rect x="1" y="7" width="12" height="1" fill={color} />
    <rect x="1" y="8" width="12" height="1" fill={color} />
    <rect x="1" y="9" width="12" height="1" fill={color} />
    <rect x="1" y="10" width="12" height="1" fill={color} />
    {/* wavy bottom */}
    <rect x="1" y="11" width="2" height="1" fill={color} />
    <rect x="4" y="11" width="2" height="1" fill={color} />
    <rect x="7" y="11" width="2" height="1" fill={color} />
    <rect x="10" y="11" width="2" height="1" fill={color} />
    <rect x="1" y="12" width="1" height="1" fill={color} />
    <rect x="5" y="12" width="1" height="1" fill={color} />
    <rect x="8" y="12" width="1" height="1" fill={color} />
    <rect x="12" y="12" width="1" height="1" fill={color} />
    {/* eyes */}
    <rect x="3" y="5" width="2" height="3" fill="#ffffff" />
    <rect x="9" y="5" width="2" height="3" fill="#ffffff" />
    <rect x="4" y="6" width="1" height="2" fill="#1d2bff" />
    <rect x="10" y="6" width="1" height="2" fill="#1d2bff" />
  </svg>
);

/* ─── SPACE INVADER ──────────────────────────────────────────────────── */
export const InvaderSprite = ({ size = 24, color = '#39ff14', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 11 8"
    width={size}
    height={size * (8 / 11)}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    <rect x="2" y="0" width="1" height="1" fill={color} />
    <rect x="8" y="0" width="1" height="1" fill={color} />
    <rect x="3" y="1" width="1" height="1" fill={color} />
    <rect x="7" y="1" width="1" height="1" fill={color} />
    <rect x="2" y="2" width="7" height="1" fill={color} />
    <rect x="1" y="3" width="2" height="1" fill={color} />
    <rect x="4" y="3" width="3" height="1" fill={color} />
    <rect x="8" y="3" width="2" height="1" fill={color} />
    <rect x="0" y="4" width="11" height="1" fill={color} />
    <rect x="0" y="5" width="1" height="1" fill={color} />
    <rect x="2" y="5" width="7" height="1" fill={color} />
    <rect x="10" y="5" width="1" height="1" fill={color} />
    <rect x="0" y="6" width="1" height="1" fill={color} />
    <rect x="2" y="6" width="1" height="1" fill={color} />
    <rect x="8" y="6" width="1" height="1" fill={color} />
    <rect x="10" y="6" width="1" height="1" fill={color} />
    <rect x="3" y="7" width="2" height="1" fill={color} />
    <rect x="6" y="7" width="2" height="1" fill={color} />
  </svg>
);

/* ─── COIN — gold disc with $ ────────────────────────────────────────── */
export const CoinSprite = ({ size = 18, color = '#ffd700', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 10 10"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    <rect x="3" y="0" width="4" height="1" fill={color} />
    <rect x="2" y="1" width="6" height="1" fill={color} />
    <rect x="1" y="2" width="8" height="1" fill={color} />
    <rect x="1" y="3" width="8" height="1" fill={color} />
    <rect x="1" y="4" width="8" height="1" fill={color} />
    <rect x="1" y="5" width="8" height="1" fill={color} />
    <rect x="1" y="6" width="8" height="1" fill={color} />
    <rect x="1" y="7" width="8" height="1" fill={color} />
    <rect x="2" y="8" width="6" height="1" fill={color} />
    <rect x="3" y="9" width="4" height="1" fill={color} />
    {/* highlight */}
    <rect x="2" y="2" width="1" height="3" fill="#ffffff" opacity="0.55" />
    {/* $ symbol */}
    <rect x="4" y="2" width="2" height="1" fill="#a06b00" />
    <rect x="3" y="3" width="1" height="1" fill="#a06b00" />
    <rect x="4" y="4" width="2" height="1" fill="#a06b00" />
    <rect x="6" y="5" width="1" height="1" fill="#a06b00" />
    <rect x="3" y="6" width="3" height="1" fill="#a06b00" />
    <rect x="4" y="3" width="1" height="4" fill="#a06b00" />
  </svg>
);

/* ─── HEART — 1UP heart ──────────────────────────────────────────────── */
export const HeartSprite = ({ size = 16, color = '#ff1177', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 9 8"
    width={size}
    height={size * (8 / 9)}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    <rect x="1" y="1" width="2" height="1" fill={color} />
    <rect x="6" y="1" width="2" height="1" fill={color} />
    <rect x="0" y="2" width="4" height="1" fill={color} />
    <rect x="5" y="2" width="4" height="1" fill={color} />
    <rect x="0" y="3" width="9" height="1" fill={color} />
    <rect x="0" y="4" width="9" height="1" fill={color} />
    <rect x="1" y="5" width="7" height="1" fill={color} />
    <rect x="2" y="6" width="5" height="1" fill={color} />
    <rect x="3" y="7" width="3" height="1" fill={color} />
    {/* shine */}
    <rect x="1" y="2" width="1" height="2" fill="#ffffff" opacity="0.8" />
  </svg>
);

/* ─── STAR — 5-point pixel star ──────────────────────────────────────── */
export const StarSprite = ({ size = 16, color = '#ffd700', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 9 9"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    <rect x="4" y="0" width="1" height="1" fill={color} />
    <rect x="3" y="1" width="3" height="1" fill={color} />
    <rect x="3" y="2" width="3" height="1" fill={color} />
    <rect x="0" y="3" width="9" height="1" fill={color} />
    <rect x="1" y="4" width="7" height="1" fill={color} />
    <rect x="2" y="5" width="5" height="1" fill={color} />
    <rect x="2" y="6" width="2" height="1" fill={color} />
    <rect x="5" y="6" width="2" height="1" fill={color} />
    <rect x="1" y="7" width="2" height="1" fill={color} />
    <rect x="6" y="7" width="2" height="1" fill={color} />
  </svg>
);

/* ─── MUSHROOM — Mario-style power-up ────────────────────────────────── */
export const MushroomSprite = ({ size = 22, color = '#ff1177', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 12 12"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    {/* cap */}
    <rect x="3" y="0" width="6" height="1" fill={color} />
    <rect x="2" y="1" width="8" height="1" fill={color} />
    <rect x="1" y="2" width="10" height="1" fill={color} />
    <rect x="1" y="3" width="10" height="1" fill={color} />
    <rect x="1" y="4" width="10" height="1" fill={color} />
    <rect x="1" y="5" width="10" height="1" fill={color} />
    {/* spots */}
    <rect x="3" y="2" width="2" height="2" fill="#ffffff" />
    <rect x="7" y="2" width="2" height="2" fill="#ffffff" />
    <rect x="5" y="4" width="2" height="2" fill="#ffffff" />
    {/* stem */}
    <rect x="3" y="6" width="6" height="1" fill="#fff7d6" />
    <rect x="3" y="7" width="6" height="1" fill="#fff7d6" />
    <rect x="3" y="8" width="6" height="1" fill="#fff7d6" />
    <rect x="3" y="9" width="6" height="1" fill="#fff7d6" />
    <rect x="3" y="10" width="6" height="1" fill="#fff7d6" />
    {/* eyes on stem */}
    <rect x="4" y="7" width="1" height="2" fill="#0a0008" />
    <rect x="7" y="7" width="1" height="2" fill="#0a0008" />
  </svg>
);

/* ─── CHERRY — Pac-Man bonus fruit ───────────────────────────────────── */
export const CherrySprite = ({ size = 20, color = '#ff1177', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 12 12"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    {/* stems */}
    <rect x="6" y="1" width="1" height="1" fill="#39ff14" />
    <rect x="7" y="2" width="1" height="1" fill="#39ff14" />
    <rect x="8" y="3" width="1" height="1" fill="#39ff14" />
    <rect x="9" y="2" width="1" height="1" fill="#39ff14" />
    <rect x="10" y="1" width="1" height="1" fill="#39ff14" />
    <rect x="5" y="3" width="1" height="1" fill="#39ff14" />
    {/* left cherry */}
    <rect x="1" y="6" width="4" height="1" fill={color} />
    <rect x="0" y="7" width="6" height="1" fill={color} />
    <rect x="0" y="8" width="6" height="1" fill={color} />
    <rect x="0" y="9" width="6" height="1" fill={color} />
    <rect x="1" y="10" width="4" height="1" fill={color} />
    {/* right cherry */}
    <rect x="6" y="7" width="4" height="1" fill={color} />
    <rect x="5" y="8" width="6" height="1" fill={color} />
    <rect x="5" y="9" width="6" height="1" fill={color} />
    <rect x="5" y="10" width="6" height="1" fill={color} />
    <rect x="6" y="11" width="4" height="1" fill={color} />
    {/* shines */}
    <rect x="1" y="7" width="1" height="1" fill="#ffffff" opacity="0.85" />
    <rect x="6" y="8" width="1" height="1" fill="#ffffff" opacity="0.85" />
  </svg>
);

/* ─── CONTROLLER — NES-style D-pad/buttons ───────────────────────────── */
export const ControllerSprite = ({ size = 28, color = '#9b9b9b', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 16 10"
    width={size}
    height={size * (10 / 16)}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    {/* body */}
    <rect x="1" y="2" width="14" height="6" fill={color} />
    <rect x="0" y="3" width="16" height="4" fill={color} />
    {/* D-pad */}
    <rect x="3" y="4" width="3" height="1" fill="#0a0008" />
    <rect x="4" y="3" width="1" height="3" fill="#0a0008" />
    {/* A B buttons */}
    <rect x="11" y="4" width="2" height="2" fill="#ff1177" />
    <rect x="13" y="4" width="2" height="2" fill="#ffd700" />
    {/* select/start */}
    <rect x="7" y="5" width="2" height="1" fill="#0a0008" />
  </svg>
);

/* ─── PIXEL DUST — random tiny squares ───────────────────────────────── */
export const PixelDust = ({ size = 4, color = '#ffffff', style, ...rest }: SpriteProps) => (
  <svg
    viewBox="0 0 4 4"
    width={size}
    height={size}
    style={{ ...pixelStyle, ...style }}
    {...rest}
  >
    <rect x="0" y="0" width="2" height="2" fill={color} />
    <rect x="2" y="2" width="2" height="2" fill={color} />
  </svg>
);
