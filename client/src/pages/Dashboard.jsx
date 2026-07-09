import MetricCard from "../components/MetricCard.jsx";

const stats = [
  { label: "Total Members", value: "120", helper: "Active gym members", color: "border-l-4 border-l-blue-500" },
  { label: "Trainers", value: "8", helper: "Available trainers", color: "border-l-4 border-l-emerald-500" },
  { label: "Today Attendance", value: "45", helper: "Members checked in", color: "border-l-4 border-l-orange-500" },
  { label: "Workout Plans", value: "32", helper: "Assigned plans", color: "border-l-4 border-l-purple-500" }
];

const activity = [
  "Ravi renewed monthly membership",
  "Priya was assigned to trainer Amit",
  "45 members marked attendance today",
  "Beginner workout plan added"
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-slate-900 px-6 py-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Admin dashboard</p>
        <h2 className="mt-2 text-3xl font-bold">Manage your gym from one place</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Track members, trainer assignments, attendance, and workout plans with a clean React frontend.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            helper={item.helper}
            color={item.color}
          />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="section-heading">Project Modules</h3>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="list-row">Member management</li>
            <li className="list-row">Trainer assignment</li>
            <li className="list-row">Membership plans</li>
            <li className="list-row">Attendance tracking</li>
            <li className="list-row">Workout and progress tracking</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="section-heading">Recent Activity</h3>
          <ul className="mt-4 space-y-3 text-slate-600">
            {activity.map((item) => (
              <li key={item} className="list-row">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
