interface StatCardProps {
  Label: string;
  Value: string;
  Helper?: string;
}

export function StatCard({ Label, Value, Helper }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="text-sm font-medium text-slate-500">{Label}</div>
      <div className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{Value}</div>
      {Helper ? <div className="mt-1 text-xs text-slate-400">{Helper}</div> : null}
    </div>
  );
}
