export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_85%_15%,rgba(253,224,71,0.16),transparent_24%),radial-gradient(circle_at_65%_80%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="animate-bg-drift absolute -left-24 top-24 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="animate-bg-drift-slower absolute right-[-6rem] top-12 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="animate-bg-drift absolute bottom-12 left-1/3 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="animate-float-slow absolute left-1/4 top-24 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(14,165,233,0.75)]" />
      <div className="animate-float-slower absolute right-1/3 top-36 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.8)]" />
      <div className="animate-float-medium absolute bottom-32 left-16 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(34,197,94,0.8)]" />
      <div className="animate-float-slow absolute bottom-24 right-16 h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_16px_rgba(244,63,94,0.7)]" />
    </div>
  );
};