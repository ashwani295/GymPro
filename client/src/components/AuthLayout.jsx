import { Activity, BadgeCheck, Dumbbell, LineChart, ShieldCheck, UsersRound } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const highlights = [
  { label: "Memberships", value: "Plans", icon: BadgeCheck },
  { label: "Attendance", value: "Live", icon: Activity },
  { label: "Progress", value: "Charts", icon: LineChart }
];

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative flex min-h-[42vh] flex-col justify-between overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-10 lg:min-h-screen">
        <div className="absolute inset-0 opacity-45">
          <div className="h-full w-full bg-[linear-gradient(135deg,rgba(16,185,129,0.34),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.24),transparent_18rem),radial-gradient(circle_at_18%_82%,rgba(59,130,246,0.24),transparent_20rem)]" />
        </div>

        <div className="relative">
          <Link to="/auth/login" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-500 text-slate-950">
              <Dumbbell size={23} strokeWidth={2.8} />
            </span>
            <span>
              <span className="block text-2xl font-black">GymPro</span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-emerald-200">
                Fitness operations suite
              </span>
            </span>
          </Link>
        </div>

        <div className="relative max-w-2xl py-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-100">
            <ShieldCheck size={15} />
            Secure gym administration
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
            Run memberships, trainers, attendance, and progress from one focused dashboard.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            Built for gym admins who need a clean workspace for daily operations, member tracking, and performance reporting.
          </p>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Icon className="text-emerald-300" size={20} />
                <p className="mt-3 text-xl font-black">{item.value}</p>
                <p className="text-xs font-semibold text-slate-300">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-100 bg-white/90 p-4 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
              <UsersRound size={20} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-950">Admin access</p>
              <p className="text-xs text-slate-500">Manage your gym workspace securely.</p>
            </div>
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
