import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card">
      <div className="mb-6">
        <p className="surface-title">
          <ShieldCheck size={16} />
          Secure login
        </p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Welcome back</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in to manage members, attendance, plans, trainers, and progress reports.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-bold text-slate-700">
          Email address
          <input
            type="email"
            name="email"
            placeholder="admin@gympro.com"
            value={formData.email}
            onChange={handleChange}
            className="input-box mt-2"
            required
          />
        </label>

        <label className="block text-sm font-bold text-slate-700">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="input-box mt-2"
            required
          />
        </label>

        {error ? <p className="alert-error">{error}</p> : null}

        <button type="submit" className="primary-btn w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
          <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
        <Mail size={15} />
        New gym admin?
        <Link to="/auth/register" className="font-black text-emerald-700 hover:text-emerald-800">
          Create account
        </Link>
      </p>
    </div>
  );
}
