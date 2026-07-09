import { useState } from "react";

const initialAttendance = [
  { id: 1, name: "Ravi Kumar", plan: "Gold", present: true },
  { id: 2, name: "Priya Singh", plan: "Silver", present: true },
  { id: 3, name: "Arjun Mehta", plan: "Basic", present: false },
  { id: 4, name: "Sneha Patel", plan: "Platinum", present: true }
];

export default function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);

  const presentCount = attendance.filter((member) => member.present).length;

  function toggleAttendance(id) {
    const updatedAttendance = attendance.map((member) => {
      if (member.id === id) {
        return { ...member, present: !member.present };
      }

      return member;
    });

    setAttendance(updatedAttendance);
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <h2>Attendance</h2>
        <p>Mark members present or absent. This is frontend-only data for now.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm font-semibold text-slate-500">Total Members</p>
          <h3 className="mt-2 text-3xl font-bold">{attendance.length}</h3>
        </div>
        <div className="card">
          <p className="text-sm font-semibold text-slate-500">Present Today</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">{presentCount}</h3>
        </div>
        <div className="card">
          <p className="text-sm font-semibold text-slate-500">Absent Today</p>
          <h3 className="mt-2 text-3xl font-bold text-rose-600">{attendance.length - presentCount}</h3>
        </div>
      </section>

      <section className="card">
        <h3 className="section-heading mb-4">Daily Attendance Sheet</h3>
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.plan}</td>
                  <td>
                    <span className={member.present ? "status-active" : "status-absent"}>
                      {member.present ? "Present" : "Absent"}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => toggleAttendance(member.id)}
                      className="secondary-btn"
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

