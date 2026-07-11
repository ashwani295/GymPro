import { useEffect, useState } from "react";
import { CalendarDays, Dumbbell, Plus, Target } from "lucide-react";
import { apiRequest } from "../services/api.js";

const emptyPlan = {
  member: "",
  trainer: "",
  goal: "General Fitness",
  days: "Mon, Wed, Fri",
  notes: ""
};

export default function Workouts() {
  const [plans, setPlans] = useState([]);
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState(emptyPlan);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadWorkoutData() {
    setError("");
    setIsLoading(true);

    try {
      const [workoutData, memberData, trainerData] = await Promise.all([
        apiRequest("/workouts"),
        apiRequest("/members"),
        apiRequest("/trainers")
      ]);

      setPlans(workoutData.workouts || []);
      setMembers(memberData.members || []);
      setTrainers(trainerData.trainers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadWorkoutData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function addPlan(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/workouts", {
        method: "POST",
        body: JSON.stringify(formData)
      });

      setPlans([data.workout, ...plans]);
      setFormData(emptyPlan);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="surface-title">
          <Dumbbell size={16} />
          Training programs
        </p>
        <h2 className="mt-2">Workout Plans</h2>
        <p>Create workout plans linked to members and trainers.</p>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      <form onSubmit={addPlan} className="card grid gap-4 md:grid-cols-2">
        <select
          name="member"
          value={formData.member}
          onChange={handleChange}
          className="input-box"
          required
        >
          <option value="">Select member</option>
          {members.map((member) => (
            <option key={member._id} value={member._id}>{member.name}</option>
          ))}
        </select>
        <select name="trainer" value={formData.trainer} onChange={handleChange} className="input-box">
          <option value="">Select trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
          ))}
        </select>
        <select name="goal" value={formData.goal} onChange={handleChange} className="input-box">
          <option>General Fitness</option>
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Strength Training</option>
          <option>Endurance</option>
        </select>
        <input
          type="text"
          name="days"
          placeholder="Workout days, example: Mon, Wed, Fri"
          value={formData.days}
          onChange={handleChange}
          className="input-box"
        />
        <textarea
          name="notes"
          placeholder="Plan notes"
          value={formData.notes}
          onChange={handleChange}
          className="input-box md:col-span-2"
          rows="3"
        />
        <button type="submit" className="primary-btn md:col-span-2" disabled={!members.length}>
          <Plus size={17} />
          Add Workout Plan
        </button>
      </form>

      <section className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan._id} className="card border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{plan.member?.name || "Member removed"}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Trainer: {plan.trainer?.name || "Not assigned"}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
                <Target size={13} />
                {plan.goal}
              </span>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              <CalendarDays size={15} />
              Workout Days: {plan.days?.join(", ") || "Not scheduled"}
            </p>
            {plan.notes ? <p className="mt-3 text-sm text-slate-500">{plan.notes}</p> : null}
          </article>
        ))}
      </section>

      {!plans.length ? <p className="empty-text">{isLoading ? "Loading workout plans..." : "No workout plans yet."}</p> : null}
    </div>
  );
}
