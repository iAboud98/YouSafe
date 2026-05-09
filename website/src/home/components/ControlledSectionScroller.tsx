import { useEffect, useRef, useState } from 'react';
import { CinematicBackdrop } from './CinematicBackdrop';
import { PageTransition } from './PageTransition';
import type { SceneConfig } from '../types';

type ControlledSectionScrollerProps = {
  sections: SceneConfig[];
  activeSectionIndex: number;
  reducedMotion: boolean;
  onNavigate: (index: number) => void;
};

const WHEEL_THRESHOLD = 25;
const SWIPE_THRESHOLD = 52;

/**
 * After a navigation we lock wheel/swipe input for this long. Matches the
 * page-flip duration plus a small buffer so trackpad inertia doesn't kick
 * off a second flip mid-flight. Nav-bar clicks bypass this cooldown.
 */
const NAV_COOLDOWN_MS = 820;

/**
 * Two wheel events arriving closer than this are treated as the same gesture
 * (typical trackpad inertia produces events ~16 ms apart). The first event
 * after a real pause has a much larger gap and is allowed through.
 */
const GESTURE_STILLNESS_MS = 110;

export const ControlledSectionScroller = ({
  sections,
  activeSectionIndex,
  reducedMotion,
  onNavigate,
}: ControlledSectionScrollerProps) => {
  const touchStartY = useRef<number | null>(null);
  const lastWheelEventRef = useRef(0);
  const lastNavRef = useRef(0);

  const activeSection = sections[activeSectionIndex];

  const [outgoing, setOutgoing] = useState<{ section: SceneConfig; direction: 1 | -1; nonce: number } | null>(null);
  const prevActiveRef = useRef(activeSectionIndex);
  const exitTimeoutRef = useRef<number | null>(null);
  const nonceRef = useRef(0);

  useEffect(() => {
    if (prevActiveRef.current === activeSectionIndex) return;

    const previousIndex = prevActiveRef.current;
    const dir: 1 | -1 = activeSectionIndex > previousIndex ? 1 : -1;
    nonceRef.current += 1;
    const nonce = nonceRef.current;
    setOutgoing({ section: sections[previousIndex], direction: dir, nonce });
    prevActiveRef.current = activeSectionIndex;

    if (exitTimeoutRef.current !== null) window.clearTimeout(exitTimeoutRef.current);
    // Outgoing scene cleanup — slightly longer than the 780ms flip so the
    // unmount happens only after the page has fully rotated out of view.
    const duration = reducedMotion ? 1 : 820;
    exitTimeoutRef.current = window.setTimeout(() => {
      setOutgoing((current) => (current && current.nonce === nonce ? null : current));
      exitTimeoutRef.current = null;
    }, duration);

    return () => {
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    };
  }, [activeSectionIndex, reducedMotion, sections]);

  useEffect(() => {
    const goTo = (nextIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(sections.length - 1, nextIndex));
      if (clampedIndex === activeSectionIndex) return;
      onNavigate(clampedIndex);
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      event.preventDefault();

      const now = performance.now();
      const sinceLastEvent = now - lastWheelEventRef.current;
      lastWheelEventRef.current = now;

      // Inside cooldown window from a recent navigation? Block — but DON'T
      // refresh the cooldown timer. This was the original bug: trackpad
      // inertia kept rewriting `lastNavRef`, perpetually extending the lock.
      if (now - lastNavRef.current < NAV_COOLDOWN_MS) return;

      // Trackpad inertia: tail events arrive ~16ms apart. The first event of
      // a NEW gesture comes after a clear pause. Require that pause.
      if (sinceLastEvent < GESTURE_STILLNESS_MS) return;

      lastNavRef.current = now;
      goTo(activeSectionIndex + (event.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) return;

      event.preventDefault();
      const now = performance.now();
      if (now - lastNavRef.current < NAV_COOLDOWN_MS) return;
      lastNavRef.current = now;

      if (event.key === 'Home') return goTo(0);
      if (event.key === 'End') return goTo(sections.length - 1);
      if (event.key === 'ArrowDown' || event.key === 'PageDown') return goTo(activeSectionIndex + 1);
      if (event.key === 'ArrowUp' || event.key === 'PageUp') return goTo(activeSectionIndex - 1);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartY.current;
      const endY = event.changedTouches[0]?.clientY ?? null;
      touchStartY.current = null;

      if (startY === null || endY === null) return;
      const delta = startY - endY;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      const now = performance.now();
      if (now - lastNavRef.current < NAV_COOLDOWN_MS) return;
      lastNavRef.current = now;
      goTo(delta > 0 ? activeSectionIndex + 1 : activeSectionIndex - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSectionIndex, onNavigate, sections.length]);

  const ActiveScene = activeSection.Component;
  const OutgoingScene = outgoing?.section.Component ?? null;
  const isMidTransition = outgoing !== null;
  const direction = outgoing?.direction ?? 1;
  // Vertical comic-panel slide: incoming panel sits above the outgoing one
  // so its bouncy entry settles on top.
  const outgoingZ = 20;
  const activeZ = 30;
  const handleSceneNavigate = (id: string) => {
    const idx = sections.findIndex((scene) => scene.id === id);
    if (idx >= 0) onNavigate(idx);
  };

  return (
    <section
      className="scrollbar-hide relative flex min-h-0 w-full flex-1 flex-col overflow-hidden"
      aria-roledescription="carousel"
      aria-label="الواجهة الرئيسية"
    >
      <CinematicBackdrop theme={activeSection.theme} reducedMotion={reducedMotion} />

      <div className="page-flip-stage scrollbar-hide overflow-hidden">
        {OutgoingScene && outgoing && (
          <PageTransition
            key={`out-${outgoing.section.id}-${outgoing.nonce}`}
            variant="exit"
            direction={outgoing.direction}
            reducedMotion={reducedMotion}
            zIndex={outgoingZ}
          >
            <OutgoingScene
              active={false}
              reducedMotion={reducedMotion}
              theme={outgoing.section.theme}
              onBackToTop={() => onNavigate(0)}
              onNavigate={handleSceneNavigate}
            />
          </PageTransition>
        )}

        <PageTransition
          key={`active-${activeSection.id}-${activeSectionIndex}`}
          variant={isMidTransition ? 'enter' : 'idle'}
          direction={direction as 1 | -1}
          reducedMotion={reducedMotion}
          zIndex={activeZ}
        >
          <ActiveScene
            active
            reducedMotion={reducedMotion}
            theme={activeSection.theme}
            onBackToTop={() => onNavigate(0)}
            onNavigate={handleSceneNavigate}
          />
        </PageTransition>
      </div>
    </section>
  );
};
