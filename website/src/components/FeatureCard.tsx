import { Gamepad2, Shield, Sparkles } from 'lucide-react';
import { useReveal } from './useReveal';

type FeatureCardProps = {
  title: string;
  text: string;
  icon: 'shield' | 'gamepad' | 'sparkles' | typeof Shield | typeof Gamepad2 | typeof Sparkles;
  tone?: string;
  index?: number;
};

const iconMap = {
  shield: Shield,
  gamepad: Gamepad2,
  sparkles: Sparkles,
} as const;

export const FeatureCard = ({ title, text, icon, tone = 'from-sky-400 to-cyan-500', index = 0 }: FeatureCardProps) => {
  const { ref, visible } = useReveal<HTMLElement>();
  const Icon = typeof icon === 'string' ? iconMap[icon] : icon;

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/95 p-6 text-right shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(14,165,233,0.16)] ${visible ? 'animate-card-rise' : 'opacity-0 translate-y-4'}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${tone} opacity-[0.08]`} />
      <div className="absolute inset-[1px] rounded-[2rem] border border-sky-100/80" />
      <div className="relative">
        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-[0_14px_32px_rgba(14,165,233,0.18)]`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
        <p className="mt-3 leading-8 text-slate-600">{text}</p>
      </div>
      <div className="pointer-events-none absolute -left-4 bottom-[-0.9rem] h-20 w-20 rounded-full bg-sky-300/20 blur-2xl transition group-hover:scale-125" />
      <div className="pointer-events-none absolute right-4 top-4 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(250,204,21,0.85)]" />
      <div className="pointer-events-none absolute right-8 top-10 h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.85)]" />
    </article>
  );
};