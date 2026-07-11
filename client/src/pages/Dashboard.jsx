import { useEffect, useMemo, useState } from "react";
import { Activity, BadgeCheck, Dumbbell, Sparkles, UsersRound } from "lucide-react";
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
      icon: UsersRound,
      tone: "blue"
    },
    {
      label: "Trainers",
      value: summary.trainers.length,
      helper: "Trainer profiles",
      icon: Activity,
      tone: "emerald"
    },
    {
      label: "Membership Plans",
      value: summary.memberships.length,
      helper: "Active plan options",
      icon: BadgeCheck,
      tone: "amber"
    },
    {
      label: "Workout Plans",
      value: summary.workouts.length,
      helper: "Assigned routines",
      icon: Dumbbell,
      tone: "rose"
    }
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="relative px-6 py-8 sm:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.28),transparent_42%),radial-gradient(circle_at_86%_24%,rgba(245,158,11,0.24),transparent_18rem)]" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-100">
              <Sparkles size={15} />
              Admin dashboard
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
              Manage memberships, coaching, attendance, and member progress from one workspace.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
              GymPro brings daily operations and performance reporting into a clean dashboard for gym admins.
            </p>
          </div>
        </div>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={isLoading ? "..." : item.value}
            helper={item.helper}
            icon={item.icon}
            tone={item.tone}
          />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="surface-title">
                <Activity size={16} />
                Attendance
              </p>
              <h3 className="mt-2 text-xl font-black text-slate-950">Attendance Overview</h3>
            </div>
          </div>
          <div className="mt-4 h-72">
            {attendanceChart.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
          <div>
            <p className="surface-title">
              <Sparkles size={16} />
              Progress
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">Fitness Progress</h3>
          </div>
          <div className="mt-4 h-72">
            {progressChart.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
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
          <p className="surface-title">
            <UsersRound size={16} />
            Staffing
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-950">Trainer Assignments</h3>
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
          <p className="surface-title">
            <Dumbbell size={16} />
            Training
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-950">Recent Workout Plans</h3>
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
