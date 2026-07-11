export default function MetricCard({ label, value, helper, icon: Icon, tone = "emerald" }) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    rose: "bg-rose-50 text-rose-700 ring-rose-100"
  };

  return (
    <article className="card flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-slate-500">{label}</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">{value}</h2>
        <span className="mt-2 block text-sm text-slate-500">{helper}</span>
      </div>
      {Icon ? (
        <span className={`grid h-11 w-11 place-items-center rounded-lg ring-1 ${tones[tone] || tones.emerald}`}>
          <Icon size={21} />
        </span>
      ) : null}
    </article>
  );
}
