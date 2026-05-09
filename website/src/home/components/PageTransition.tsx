import type { ReactNode } from 'react';

export type PageTransitionVariant = 'enter' | 'exit' | 'idle';

type PageTransitionProps = {
  children: ReactNode;
  variant: PageTransitionVariant;
  /** 1 = forward navigation (next panel rises from below), -1 = backward. */
  direction: 1 | -1;
  reducedMotion: boolean;
  zIndex?: number;
};

/**
 * Comic-panel transition wrapper. Forward navigation slides the outgoing
 * panel up and lifts the incoming one in from the bottom; backward navigation
 * is the mirror of that. Bouncy spring easing keeps the motion playful.
 */
export const PageTransition = ({
  children,
  variant,
  direction,
  reducedMotion,
  zIndex = 10,
}: PageTransitionProps) => {
  const animationClass = reducedMotion || variant === 'idle'
    ? ''
    : variant === 'exit'
      ? direction === 1 ? 'page-flip-out-forward' : 'page-flip-out-backward'
      : direction === 1 ? 'page-flip-in-forward' : 'page-flip-in-backward';

  return (
    <div
      className={`page-transition flex flex-col ${animationClass}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};
