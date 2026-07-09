import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Login</h2>
      <p className="mt-1 text-slate-500">Admin can login here.</p>

      <form className="mt-6 space-y-4">
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
            placeholder="Enter password"
            className="input-box mt-2"
          />
        </label>

        <button type="button" className="primary-btn w-full">
          Login
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        New gym admin?{" "}
        <Link to="/auth/register" className="font-bold text-blue-600">
          Create account
        </Link>
      </p>
    </div>
  );
}
