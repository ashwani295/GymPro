export default function MetricCard({ label, value, helper, color = "border-emerald-500" }) {
  return (
    <article className={`rounded-lg border bg-white p-5 shadow-sm ${color}`}>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
      <span className="mt-2 block text-sm text-slate-500">{helper}</span>
    </article>
  );
}
