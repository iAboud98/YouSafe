type AnimatedStageProps = {
  children: React.ReactNode;
  tilt: number;
  active: boolean;
  reducedMotion: boolean;
  className?: string;
};

export const AnimatedStage = ({ children, tilt, active, reducedMotion, className = '' }: AnimatedStageProps) => {
  const transform = reducedMotion ? 'none' : `rotate(${tilt}deg) scale(${active ? 1 : 0.986})`;

  return (
    <div
      className={`story-stage relative mx-auto w-[94vw] max-w-[1660px] rounded-[2.5rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,251,244,0.96)_100%)] px-4 py-4 shadow-[0_32px_100px_rgba(84,68,45,0.12)] backdrop-blur-xl transition-[transform,box-shadow] duration-700 ease-in-out sm:w-[90vw] sm:px-5 sm:py-5 lg:w-[88vw] lg:rounded-[3rem] lg:px-7 lg:py-7 ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};
