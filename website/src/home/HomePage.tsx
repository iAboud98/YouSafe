import { useCallback, useMemo, useState } from 'react';
import { ControlledSectionScroller } from './components/ControlledSectionScroller';
import { GlobalNavbar } from './components/GlobalNavbar';
import { ScrollProgressDots } from './components/ScrollProgressDots';
import { useReducedMotion } from './hooks/useReducedMotion';
import { AboutScene } from './scenes/AboutScene';
import { AssistantScene } from './scenes/AssistantScene';
import { FinalCTAWithFooterScene } from './scenes/FinalCTAWithFooterScene';
import { HeroScene } from './scenes/HeroScene';
import { JourneyScene } from './scenes/JourneyScene';
import { LevelPreviewScene } from './scenes/LevelPreviewScene';
import { ScenariosCarouselScene } from './scenes/ScenariosCarouselScene';
import type { SceneConfig } from './types';

const sceneConfigs: SceneConfig[] = [
  {
    id: 'home',
    label: 'الرئيسية',
    title: 'الرئيسية',
    theme: {
      backdrop: 'linear-gradient(155deg, #0a0512 0%, #08040f 40%, #070310 100%)',
      curtain: '#bf5fff',
      accent: '#bf5fff',
      glow: 'rgba(191,95,255,0.5)',
      kicker: 'PLAYER 1',
    },
    Component: HeroScene,
  },
  {
    id: 'about',
    label: 'فكرة اللعبة',
    title: 'الفكرة',
    theme: {
      backdrop: 'linear-gradient(160deg, #F5F7FB 0%, #EEF2F9 55%, #D9DFEA 100%)',
      curtain: '#35D6FF',
      accent: '#35D6FF',
      glow: 'rgba(53,214,255,0.40)',
      kicker: 'STAGE 02',
    },
    Component: AboutScene,
  },
  {
    id: 'journey',
    label: 'خليك في أمان',
    title: 'الرحلة',
    theme: {
      backdrop: 'linear-gradient(150deg, #020b14 0%, #050f1c 45%, #020a12 100%)',
      curtain: '#00C8FF',
      accent: '#00C8FF',
      glow: 'rgba(0,200,255,0.45)',
      kicker: 'STAGE 03',
    },
    Component: JourneyScene,
  },
  {
    id: 'level',
    label: 'معاينة المرحلة',
    title: 'المرحلة',
    theme: {
      backdrop: 'linear-gradient(155deg, #0a0512 0%, #08040f 40%, #070310 100%)',
      curtain: '#bf5fff',
      accent: '#bf5fff',
      glow: 'rgba(191,95,255,0.5)',
      kicker: 'STAGE 04',
    },
    Component: LevelPreviewScene,
  },
  {
    id: 'assistant',
    label: 'المساعد الذكي',
    title: 'المرشد',
    theme: {
      backdrop: 'linear-gradient(150deg, #030814 0%, #040a14 40%, #030810 100%)',
      curtain: '#4fd9ff',
      accent: '#4fd9ff',
      glow: 'rgba(79,217,255,0.45)',
      kicker: 'STAGE 06',
    },
    Component: AssistantScene,
  },
  {
    id: 'scenarios',
    label: 'المواقف',
    title: 'المواقف',
    theme: {
      backdrop: 'linear-gradient(155deg, #0a0512 0%, #08040f 40%, #070310 100%)',
      curtain: '#bf5fff',
      accent: '#bf5fff',
      glow: 'rgba(191,95,255,0.5)',
      kicker: 'STAGE 07',
    },
    Component: ScenariosCarouselScene,
  },
  {
    id: 'start',
    label: 'ابدأ الآن',
    title: 'ابدأ',
    theme: {
      backdrop: 'linear-gradient(155deg, #020108 0%, #010205 42%, #010102 100%)',
      curtain: '#bf5fff',
      accent: '#bf5fff',
      glow: 'rgba(191,95,255,0.32)',
      kicker: 'GAME START',
    },
    Component: FinalCTAWithFooterScene,
  },
];

type HomePageProps = {
  onNavigateToTalk?: () => void;
};

export const HomePage = ({ onNavigateToTalk }: HomePageProps = {}) => {
  const reducedMotion = useReducedMotion();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const goToSection = useCallback((nextIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(sceneConfigs.length - 1, nextIndex));
    setActiveSectionIndex((current) => (clampedIndex === current ? current : clampedIndex));
  }, []);

  const navItems = useMemo(() => sceneConfigs.map(({ id, label }) => ({ id, label })), []);
  const activeTheme = sceneConfigs[activeSectionIndex].theme;

  return (
    <main dir="rtl" className="scrollbar-hide relative flex h-full max-h-full min-h-0 flex-1 flex-col overflow-hidden">
      <GlobalNavbar
        items={navItems}
        activeIndex={activeSectionIndex}
        onNavigate={goToSection}
        onTalk={onNavigateToTalk}
        accent={activeTheme.accent}
      />
      <ScrollProgressDots
        items={navItems}
        activeIndex={activeSectionIndex}
        onNavigate={(id) => {
          const index = sceneConfigs.findIndex((scene) => scene.id === id);
          if (index >= 0) goToSection(index);
        }}
        accent={activeTheme.accent}
      />
      <ControlledSectionScroller
        sections={sceneConfigs}
        activeSectionIndex={activeSectionIndex}
        reducedMotion={reducedMotion}
        onNavigate={goToSection}
      />
    </main>
  );
};
