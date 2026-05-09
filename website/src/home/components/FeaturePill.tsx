type FeaturePillProps = {
  children: React.ReactNode;
};

export const FeaturePill = ({ children }: FeaturePillProps) => {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_10px_24px_rgba(84,68,45,0.06)] backdrop-blur-md">
      {children}
    </span>
  );
};
