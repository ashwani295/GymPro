import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Plus, Search, UserRoundPlus, UsersRound } from "lucide-react";
import { apiRequest } from "../services/api.js";

const emptyMember = {
  name: "",
  email: "",
  phone: "",
  membership: "",
  trainer: ""
};

const emptyMembership = {
  name: "",
  price: "",
  durationMonths: "1",
  description: ""
};

const emptyTrainer = {
  name: "",
  email: "",
  phone: "",
  specialization: ""
};

export default function Members() {
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [memberForm, setMemberForm] = useState(emptyMember);
  const [membershipForm, setMembershipForm] = useState(emptyMembership);
  const [trainerForm, setTrainerForm] = useState(emptyTrainer);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

  async function loadManagementData() {
    setError("");
    setIsLoading(true);

    try {
      const [memberData, membershipData, trainerData] = await Promise.all([
        apiRequest("/members"),
        apiRequest("/memberships"),
        apiRequest("/trainers")
      ]);

      setMembers(memberData.members || []);
      setMemberships(membershipData.memberships || []);
      setTrainers(trainerData.trainers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadManagementData();
  }, []);

  function updateMemberForm(event) {
    const { name, value } = event.target;
    setMemberForm({ ...memberForm, [name]: value });
  }

  function updateMembershipForm(event) {
    const { name, value } = event.target;
    setMembershipForm({ ...membershipForm, [name]: value });
  }

  function updateTrainerForm(event) {
    const { name, value } = event.target;
    setTrainerForm({ ...trainerForm, [name]: value });
  }

  async function addMembership(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/memberships", {
        method: "POST",
        body: JSON.stringify({
          ...membershipForm,
          price: Number(membershipForm.price),
          durationMonths: Number(membershipForm.durationMonths)
        })
      });

      setMemberships([data.membership, ...memberships]);
      setMembershipForm(emptyMembership);
    } catch (err) {
      setError(err.message);
    }
  }

  async function addTrainer(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/trainers", {
        method: "POST",
        body: JSON.stringify(trainerForm)
      });

      setTrainers([data.trainer, ...trainers]);
      setTrainerForm(emptyTrainer);
    } catch (err) {
      setError(err.message);
    }
  }

  async function addMember(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/members", {
        method: "POST",
        body: JSON.stringify(memberForm)
      });

      setMembers([data.member, ...members]);
      setMemberForm(emptyMember);
    } catch (err) {
      setError(err.message);
    }
  }

  async function assignTrainer(memberId, trainerId) {
    setError("");

    try {
      const data = await apiRequest(`/members/${memberId}/assign-trainer`, {
        method: "PATCH",
        body: JSON.stringify({ trainer: trainerId })
      });

      setMembers(members.map((member) => (member._id === memberId ? data.member : member)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <p className="surface-title">
          <UsersRound size={16} />
          Member operations
        </p>
        <h2 className="mt-2">Members</h2>
        <p>Manage plans, trainers, members, and trainer assignments from one place.</p>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      <section className="grid gap-5 lg:grid-cols-2">
        <form onSubmit={addMembership} className="card space-y-4">
          <div>
            <p className="surface-title">
              <BadgeCheck size={16} />
              Plans
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">Membership Plans</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Plan name"
              value={membershipForm.name}
              onChange={updateMembershipForm}
              className="input-box"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Monthly price"
              value={membershipForm.price}
              onChange={updateMembershipForm}
              className="input-box"
              min="0"
              required
            />
            <input
              type="number"
              name="durationMonths"
              placeholder="Duration months"
              value={membershipForm.durationMonths}
              onChange={updateMembershipForm}
              className="input-box"
              min="1"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={membershipForm.description}
              onChange={updateMembershipForm}
              className="input-box"
            />
          </div>
          <button type="submit" className="primary-btn">
            <Plus size={17} />
            Add Plan
          </button>

          <div className="space-y-2">
            {memberships.map((plan) => (
              <div key={plan._id} className="list-row flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-800">{plan.name}</span>
                <span className="text-sm text-slate-500">
                  ${plan.price} / {plan.durationMonths} mo
                </span>
              </div>
            ))}
            {!memberships.length && !isLoading ? <p className="empty-text">No plans added yet.</p> : null}
          </div>
        </form>

        <form onSubmit={addTrainer} className="card space-y-4">
          <div>
            <p className="surface-title">
              <UserRoundPlus size={16} />
              Coaching
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">Trainers</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Trainer name"
              value={trainerForm.name}
              onChange={updateTrainerForm}
              className="input-box"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={trainerForm.specialization}
              onChange={updateTrainerForm}
              className="input-box"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={trainerForm.email}
              onChange={updateTrainerForm}
              className="input-box"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={trainerForm.phone}
              onChange={updateTrainerForm}
              className="input-box"
            />
          </div>
          <button type="submit" className="primary-btn">
            <Plus size={17} />
            Add Trainer
          </button>

          <div className="space-y-2">
            {trainers.map((trainer) => (
              <div key={trainer._id} className="list-row flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-800">{trainer.name}</span>
                <span className="text-sm text-slate-500">{trainer.specialization}</span>
              </div>
            ))}
            {!trainers.length && !isLoading ? <p className="empty-text">No trainers added yet.</p> : null}
          </div>
        </form>
      </section>

      <form onSubmit={addMember} className="card grid gap-4 md:grid-cols-5">
        <input
          type="text"
          name="name"
          placeholder="Member name"
          value={memberForm.name}
          onChange={updateMemberForm}
          className="input-box"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={memberForm.email}
          onChange={updateMemberForm}
          className="input-box"
        />
        <select name="membership" value={memberForm.membership} onChange={updateMemberForm} className="input-box">
          <option value="">Select plan</option>
          {memberships.map((plan) => (
            <option key={plan._id} value={plan._id}>{plan.name}</option>
          ))}
        </select>
        <select name="trainer" value={memberForm.trainer} onChange={updateMemberForm} className="input-box">
          <option value="">Assign trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
          ))}
        </select>
        <button type="submit" className="primary-btn">
          <Plus size={17} />
          Add Member
        </button>
      </form>

      <div className="card">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="surface-title">
              <UsersRound size={16} />
              Directory
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950">Member List</h3>
          </div>
          <label className="relative sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Search member"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="input-box pl-10"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="app-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership</th>
                <th>Trainer</th>
                <th>Status</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.membership?.name || "No plan"}</td>
                  <td>{member.trainer?.name || "Not assigned"}</td>
                  <td>
                    <span className={member.status === "Active" ? "status-active" : "status-pending"}>
                      {member.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={member.trainer?._id || ""}
                      onChange={(event) => assignTrainer(member._id, event.target.value)}
                      className="input-box min-w-[10rem]"
                    >
                      <option value="">None</option>
                      {trainers.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {!filteredMembers.length ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    {isLoading ? "Loading members..." : "No members found."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
