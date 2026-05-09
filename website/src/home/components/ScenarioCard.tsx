type ScenarioCardProps = {
  title: string;
  description: string;
  badge: string;
  accent: string;
  icon: React.ReactNode;
};

export const ScenarioCard = ({ title, description, badge, accent, icon }: ScenarioCardProps) => {
  return (
    <article className={`scenario-card min-w-[78%] snap-center rounded-[2rem] border border-white/75 bg-white/90 p-6 text-right shadow-[0_18px_40px_rgba(84,68,45,0.08)] backdrop-blur-md md:min-w-[36%]`}>
      <div className={`inline-flex rounded-full bg-gradient-to-r ${accent} px-4 py-2 text-xs font-bold text-white shadow-sm`}>{badge}</div>
      <div className="mt-5 flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white`}>{icon}</div>
        <div>
          <h3 className="text-2xl font-black text-slate-950">{title}</h3>
          <p className="mt-3 leading-8 text-slate-600">{description}</p>
        </div>
      </div>
    </article>
  );
};
