import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Register</h2>
      <p className="mt-1 text-slate-500">Create a new admin account.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-slate-700">
          Name
          <input
            type="text"
            name="name"
            placeholder="Gym Admin"
            value={formData.name}
            onChange={handleChange}
            className="input-box mt-2"
            required
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Email
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

        <label className="block text-sm font-semibold text-slate-700">
          Password
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="input-box mt-2"
            minLength={6}
            required
          />
        </label>

        {error ? (
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
            {error}
          </p>
        ) : null}

        <button type="submit" className="primary-btn w-full disabled:cursor-not-allowed disabled:bg-slate-400" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
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
