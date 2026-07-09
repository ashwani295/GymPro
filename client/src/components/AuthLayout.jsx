import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="grid min-h-screen bg-slate-100 lg:grid-cols-2">
      <section className="flex flex-col justify-center bg-slate-900 px-8 py-12 text-white">
        <Link to="/dashboard" className="mb-8 text-3xl font-bold">
          GymPro
        </Link>

        <h1 className="max-w-lg text-4xl font-bold">Welcome to GymPro</h1>
        <p className="mt-4 max-w-lg leading-7 text-slate-300">
          This React project will manage gym members, trainers, memberships,
          attendance, workout plans, and fitness progress.
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-10">
        <Outlet />
      </section>
    </main>
  );
}
