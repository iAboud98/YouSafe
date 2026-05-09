import type { ComponentType } from 'react';

export type SceneTheme = {
  /** Tailwind class fragment used as a full-bleed background gradient */
  backdrop: string;
  /** Single solid hex color used by the curtain wipe between scenes */
  curtain: string;
  /** Hex used for accent text / glow */
  accent: string;
  /** Soft accent for radial highlights */
  glow: string;
  /** Display kana label (English/transliteration) shown above the title */
  kicker: string;
};

export type SceneConfig = {
  id: string;
  label: string;
  title: string;
  theme: SceneTheme;
  Component: ComponentType<SceneComponentProps>;
};

export type SceneComponentProps = {
  active: boolean;
  reducedMotion: boolean;
  theme: SceneTheme;
  onBackToTop?: () => void;
  onNavigate?: (id: string) => void;
};
