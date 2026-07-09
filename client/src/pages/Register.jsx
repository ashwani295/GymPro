import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Register</h2>
      <p className="mt-1 text-slate-500">Create a new admin account.</p>

      <form className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-slate-700">
          Name
          <input
            type="text"
            placeholder="Gym Admin"
            className="input-box mt-2"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Email
          <input
            type="email"
            placeholder="admin@gympro.com"
            className="input-box mt-2"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Password
          <input
            type="password"
            placeholder="Create password"
            className="input-box mt-2"
          />
        </label>

        <button type="button" className="primary-btn w-full">
          Register
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-bold text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}
