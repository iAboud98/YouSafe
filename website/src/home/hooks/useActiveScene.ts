import { RefObject, useEffect, useState } from 'react';

export const useActiveScene = (sceneRefs: Array<RefObject<HTMLElement>>, fallbackIndex = 0) => {
  const [activeScene, setActiveScene] = useState(fallbackIndex);

  useEffect(() => {
    const nodes = sceneRefs.map((ref) => ref.current).filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = Number((visible.target as HTMLElement).dataset.sceneIndex);
        if (!Number.isNaN(index)) {
          setActiveScene(index);
        }
      },
      {
        threshold: [0.35, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sceneRefs]);

  return { activeScene, setActiveScene };
};
