import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api.js";

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

export default function Attendance() {
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayValue());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const attendanceByMember = useMemo(() => {
    return attendance.reduce((records, item) => {
      const memberId = item.member?._id || item.member;
      records[memberId] = item;
      return records;
    }, {});
  }, [attendance]);

  const presentCount = attendance.filter((item) => item.status === "Present").length;

  async function loadAttendanceData(date = selectedDate) {
    setError("");
    setIsLoading(true);

    try {
      const [memberData, attendanceData] = await Promise.all([
        apiRequest("/members"),
        apiRequest(`/attendance?date=${date}`)
      ]);

      setMembers(memberData.members || []);
      setAttendance(attendanceData.attendance || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAttendanceData(selectedDate);
  }, [selectedDate]);

  async function markAttendance(memberId, nextStatus) {
    setError("");

    try {
      const data = await apiRequest("/attendance", {
        method: "POST",
        body: JSON.stringify({
          member: memberId,
          date: selectedDate,
          status: nextStatus
        })
      });

      const existing = attendance.some((item) => (item.member?._id || item.member) === memberId);
      setAttendance(
        existing
          ? attendance.map((item) => ((item.member?._id || item.member) === memberId ? data.attendance : item))
          : [data.attendance, ...attendance]
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <h2>Attendance</h2>
        <p>Mark daily attendance and review present or absent members.</p>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      <section className="grid gap-4 sm:grid-cols-4">
        <label className="card sm:col-span-1">
          <span className="text-sm font-semibold text-slate-500">Attendance Date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="input-box mt-2"
          />
        </label>
        <div className="card">
          <p className="text-sm font-semibold text-slate-500">Total Members</p>
          <h3 className="mt-2 text-3xl font-bold">{members.length}</h3>
        </div>
        <div className="card">
          <p className="text-sm font-semibold text-slate-500">Present</p>
          <h3 className="mt-2 text-3xl font-bold text-emerald-600">{presentCount}</h3>
        </div>
        <div className="card">
          <p className="text-sm font-semibold text-slate-500">Absent</p>
          <h3 className="mt-2 text-3xl font-bold text-rose-600">{members.length - presentCount}</h3>
        </div>
      </section>

      <section className="card">
        <h3 className="section-heading mb-4">Daily Attendance Sheet</h3>
        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Membership</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const record = attendanceByMember[member._id];
                const status = record?.status || "Absent";
                const nextStatus = status === "Present" ? "Absent" : "Present";

                return (
                  <tr key={member._id}>
                    <td>{member.name}</td>
                    <td>{member.membership?.name || "No plan"}</td>
                    <td>
                      <span className={status === "Present" ? "status-active" : "status-absent"}>
                        {status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => markAttendance(member._id, nextStatus)}
                        className="secondary-btn"
                      >
                        Mark {nextStatus}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!members.length ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    {isLoading ? "Loading attendance..." : "Add members before marking attendance."}
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
