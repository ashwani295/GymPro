import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import MetricCard from "../components/MetricCard.jsx";
import { apiRequest } from "../services/api.js";

function shortDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
}

function buildAttendanceChart(records) {
  const grouped = records.reduce((items, record) => {
    const key = shortDate(record.date);
    const current = items[key] || { date: key, Present: 0, Absent: 0 };
    current[record.status] += 1;
    items[key] = current;
    return items;
  }, {});

  return Object.values(grouped).slice(-7);
}

function buildProgressChart(records) {
  const grouped = records.reduce((items, record) => {
    const key = shortDate(record.date);
    const current = items[key] || { date: key, totalWeight: 0, totalBodyFat: 0, count: 0 };

    current.totalWeight += Number(record.weight || 0);
    current.totalBodyFat += Number(record.bodyFat || 0);
    current.count += 1;
    items[key] = current;
    return items;
  }, {});

  return Object.values(grouped)
    .map((item) => ({
      date: item.date,
      weight: Number((item.totalWeight / item.count).toFixed(1)),
      bodyFat: Number((item.totalBodyFat / item.count).toFixed(1))
    }))
    .slice(-7);
}

export default function Dashboard() {
  const [summary, setSummary] = useState({
    members: [],
    trainers: [],
    memberships: [],
    workouts: [],
    attendance: [],
    progress: []
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setError("");
      setIsLoading(true);

      try {
        const [memberData, trainerData, membershipData, workoutData, attendanceData, progressData] =
          await Promise.all([
            apiRequest("/members"),
            apiRequest("/trainers"),
            apiRequest("/memberships"),
            apiRequest("/workouts"),
            apiRequest("/attendance"),
            apiRequest("/progress")
          ]);

        setSummary({
          members: memberData.members || [],
          trainers: trainerData.trainers || [],
          memberships: membershipData.memberships || [],
          workouts: workoutData.workouts || [],
          attendance: attendanceData.attendance || [],
          progress: progressData.progress || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const attendanceChart = useMemo(() => buildAttendanceChart(summary.attendance), [summary.attendance]);
  const progressChart = useMemo(() => buildProgressChart(summary.progress), [summary.progress]);

  const stats = [
    {
      label: "Total Members",
      value: summary.members.length,
      helper: "Registered gym members",
      color: "border-l-4 border-l-blue-500"
    },
    {
      label: "Trainers",
      value: summary.trainers.length,
      helper: "Trainer profiles",
      color: "border-l-4 border-l-emerald-500"
    },
    {
      label: "Membership Plans",
      value: summary.memberships.length,
      helper: "Active plan options",
      color: "border-l-4 border-l-amber-500"
    },
    {
      label: "Workout Plans",
      value: summary.workouts.length,
      helper: "Assigned routines",
      color: "border-l-4 border-l-rose-500"
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 px-6 py-8 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Admin dashboard</p>
        <h2 className="mt-2 text-3xl font-bold">Manage your gym from one place</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Track memberships, trainers, attendance, workout plans, and member fitness progress.
        </p>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={isLoading ? "..." : item.value}
            helper={item.helper}
            color={item.color}
          />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="section-heading">Attendance Overview</h3>
          <div className="mt-4 h-72">
            {attendanceChart.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Present" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Absent" fill="#e11d48" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="empty-text">Mark attendance to show chart data.</p>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="section-heading">Fitness Progress</h3>
          <div className="mt-4 h-72">
            {progressChart.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="bodyFat" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="empty-text">Add progress records to show chart data.</p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="section-heading">Trainer Assignments</h3>
          <ul className="mt-4 space-y-3 text-slate-600">
            {summary.members.slice(0, 5).map((member) => (
              <li key={member._id} className="list-row flex items-center justify-between gap-3">
                <span>{member.name}</span>
                <span className="font-semibold text-slate-800">{member.trainer?.name || "Not assigned"}</span>
              </li>
            ))}
            {!summary.members.length ? <li className="empty-text">Add members to see assignments.</li> : null}
          </ul>
        </div>

        <div className="card">
          <h3 className="section-heading">Recent Workout Plans</h3>
          <ul className="mt-4 space-y-3 text-slate-600">
            {summary.workouts.slice(0, 5).map((plan) => (
              <li key={plan._id} className="list-row flex items-center justify-between gap-3">
                <span>{plan.member?.name || "Member removed"}</span>
                <span className="font-semibold text-slate-800">{plan.goal}</span>
              </li>
            ))}
            {!summary.workouts.length ? <li className="empty-text">Create workout plans to see activity.</li> : null}
          </ul>
        </div>
      </section>
    </div>
  );
}
