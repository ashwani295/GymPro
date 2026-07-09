import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/members", label: "Members" },
  { to: "/attendance", label: "Attendance" },
  { to: "/workouts", label: "Workouts" }
];

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">GymPro</h1>
            <p className="text-sm text-slate-500">Gym Membership Management System</p>
        </div>

          <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-7">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
        <p>React course project - frontend data is stored with React state for now.</p>
      </footer>
    </div>
  );
}
