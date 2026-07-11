import {
  Activity,
  BarChart3,
  Dumbbell,
  LogOut,
  Menu,
  TrendingUp,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/members", label: "Members", icon: UsersRound },
  { to: "/attendance", label: "Attendance", icon: Activity },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/progress", label: "Progress", icon: TrendingUp }
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/auth/login");
  }

  return (
    <div className="min-h-screen text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/70 bg-slate-950 px-5 py-6 text-white shadow-2xl lg:flex lg:flex-col">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-500 text-slate-950">
            <Dumbbell size={23} strokeWidth={2.7} />
          </span>
          <span>
            <span className="block text-xl font-black">GymPro</span>
            <span className="block text-xs font-semibold text-slate-400">Fitness operations suite</span>
          </span>
        </NavLink>

        <nav className="mt-9 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition",
                    isActive
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  ].join(" ")
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-emerald-300">
              <UserRound size={20} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{user?.name || "Gym Admin"}</p>
              <p className="truncate text-xs text-slate-400">{user?.email || "Admin workspace"}</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="danger-btn mt-4 w-full">
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/80 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="secondary-btn lg:hidden"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Command center</p>
              <h1 className="text-xl font-black text-slate-950">GymPro Management</h1>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-950">{user?.name || "Gym Admin"}</p>
                <p className="text-xs text-slate-500">Signed in</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                <UserRound size={19} />
              </span>
            </div>
          </div>

          {isMenuOpen ? (
            <nav className="grid gap-2 border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold",
                        isActive ? "bg-emerald-100 text-emerald-800" : "text-slate-700 hover:bg-slate-100"
                      ].join(" ")
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
              <button type="button" onClick={handleLogout} className="danger-btn justify-start">
                <LogOut size={17} />
                Logout
              </button>
            </nav>
          ) : null}
        </header>

        <main className="mx-auto max-w-7xl px-5 py-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
