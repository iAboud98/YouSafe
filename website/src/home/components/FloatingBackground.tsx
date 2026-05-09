import { MapPinned, Shield, Sparkles, Star } from 'lucide-react';

export const FloatingBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(250,204,21,0.22),transparent_22%),radial-gradient(circle_at_85%_12%,rgba(14,165,233,0.18),transparent_20%),radial-gradient(circle_at_74%_82%,rgba(34,197,94,0.12),transparent_22%)]" />
      <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(rgba(149,127,100,0.15)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="animate-blob-drift absolute left-[-5rem] top-24 h-72 w-72 rounded-full bg-[#dbeafe]/50 blur-3xl" />
      <div className="animate-blob-drift-slower absolute right-[-4rem] top-[18rem] h-80 w-80 rounded-full bg-[#fde68a]/35 blur-3xl" />
      <div className="animate-blob-drift absolute bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#dcfce7]/35 blur-3xl" />

      <div className="animate-float-slow absolute right-[10%] top-[12%] rounded-full border border-white/70 bg-white/70 p-3 text-sky-700 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-md">
        <Shield className="h-4 w-4" />
      </div>
      <div className="animate-float-medium absolute left-[12%] top-[28%] rounded-full border border-white/70 bg-white/70 p-3 text-amber-600 shadow-[0_10px_30px_rgba(250,204,21,0.08)] backdrop-blur-md">
        <Star className="h-4 w-4" />
      </div>
      <div className="animate-float-slower absolute right-[18%] bottom-[18%] rounded-full border border-white/70 bg-white/70 p-3 text-emerald-600 shadow-[0_10px_30px_rgba(34,197,94,0.08)] backdrop-blur-md">
        <MapPinned className="h-4 w-4" />
      </div>
      <div className="animate-float-medium absolute left-[18%] bottom-[12%] rounded-full border border-white/70 bg-white/70 p-3 text-sky-700 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-md">
        <Sparkles className="h-4 w-4" />
      </div>
    </div>
  );
};
