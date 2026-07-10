import { useEffect, useState } from "react";
import { apiRequest } from "../services/api.js";

const emptyProgress = {
  member: "",
  date: new Date().toISOString().slice(0, 10),
  weight: "",
  bodyFat: "",
  notes: ""
};

export default function Progress() {
  const [members, setMembers] = useState([]);
  const [progress, setProgress] = useState([]);
  const [formData, setFormData] = useState(emptyProgress);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadProgressData() {
    setError("");
    setIsLoading(true);

    try {
      const [memberData, progressData] = await Promise.all([
        apiRequest("/members"),
        apiRequest("/progress")
      ]);

      setMembers(memberData.members || []);
      setProgress(progressData.progress || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProgressData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function addProgress(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/progress", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          weight: Number(formData.weight),
          bodyFat: Number(formData.bodyFat)
        })
      });

      setProgress([...progress, data.progress]);
      setFormData(emptyProgress);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <h2>Progress Tracking</h2>
        <p>Record member weight, body fat, and progress notes over time.</p>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      <form onSubmit={addProgress} className="card grid gap-4 md:grid-cols-5">
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
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input-box"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight kg"
          value={formData.weight}
          onChange={handleChange}
          className="input-box"
          min="0"
          required
        />
        <input
          type="number"
          name="bodyFat"
          placeholder="Body fat %"
          value={formData.bodyFat}
          onChange={handleChange}
          className="input-box"
          min="0"
          max="100"
        />
        <button type="submit" className="primary-btn" disabled={!members.length}>
          Add Progress
        </button>
        <textarea
          name="notes"
          placeholder="Progress notes"
          value={formData.notes}
          onChange={handleChange}
          className="input-box md:col-span-5"
          rows="3"
        />
      </form>

      <section className="card">
        <h3 className="section-heading mb-4">Progress Records</h3>
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Date</th>
                <th>Weight</th>
                <th>Body Fat</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((record) => (
                <tr key={record._id}>
                  <td>{record.member?.name || "Member removed"}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.weight} kg</td>
                  <td>{record.bodyFat || 0}%</td>
                  <td>{record.notes || "No notes"}</td>
                </tr>
              ))}
              {!progress.length ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    {isLoading ? "Loading progress..." : "No progress records yet."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
