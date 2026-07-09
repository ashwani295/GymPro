import { useState } from "react";

const initialPlans = [
  {
    id: 1,
    member: "Ravi Kumar",
    goal: "Muscle Gain",
    trainer: "Amit",
    days: "Mon, Wed, Fri"
  },
  {
    id: 2,
    member: "Priya Singh",
    goal: "Weight Loss",
    trainer: "Neha",
    days: "Tue, Thu, Sat"
  }
];

export default function Workouts() {
  const [plans, setPlans] = useState(initialPlans);
  const [formData, setFormData] = useState({
    member: "",
    goal: "General Fitness",
    trainer: "",
    days: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function addPlan(event) {
    event.preventDefault();

    if (!formData.member.trim() || !formData.trainer.trim()) {
      return;
    }

    const newPlan = {
      id: Date.now(),
      member: formData.member,
      goal: formData.goal,
      trainer: formData.trainer,
      days: formData.days || "Mon, Wed, Fri"
    };

    setPlans([...plans, newPlan]);
    setFormData({
      member: "",
      goal: "General Fitness",
      trainer: "",
      days: ""
    });
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <h2>Workout Plans</h2>
        <p>Create simple workout plans and display them as cards.</p>
      </section>

      <form onSubmit={addPlan} className="card grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="member"
          placeholder="Member name"
          value={formData.member}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="text"
          name="trainer"
          placeholder="Trainer name"
          value={formData.trainer}
          onChange={handleChange}
          className="input-box"
        />
        <select name="goal" value={formData.goal} onChange={handleChange} className="input-box">
          <option>General Fitness</option>
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Strength Training</option>
        </select>
        <input
          type="text"
          name="days"
          placeholder="Workout days, example: Mon, Wed, Fri"
          value={formData.days}
          onChange={handleChange}
          className="input-box"
        />
        <button type="submit" className="primary-btn md:col-span-2">
          Add Workout Plan
        </button>
      </form>

      <section className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.id} className="card border-l-4 border-l-purple-500">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{plan.member}</h3>
                <p className="mt-1 text-sm text-slate-500">Trainer: {plan.trainer}</p>
              </div>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                {plan.goal}
              </span>
            </div>
            <p className="mt-4 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
              Workout Days: {plan.days}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

