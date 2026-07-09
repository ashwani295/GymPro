import { useState } from "react";

const members = [
  { id: 1, name: "Ravi Kumar", plan: "Gold", trainer: "Amit", status: "Active" },
  { id: 2, name: "Priya Singh", plan: "Silver", trainer: "Neha", status: "Active" },
  { id: 3, name: "Arjun Mehta", plan: "Basic", trainer: "Not Assigned", status: "Pending" }
];

export default function Members() {
  const [search, setSearch] = useState("");
  const [memberList, setMemberList] = useState(members);
  const [formData, setFormData] = useState({
    name: "",
    plan: "Basic",
    trainer: ""
  });

  const filteredMembers = memberList.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function addMember(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: formData.name,
      plan: formData.plan,
      trainer: formData.trainer || "Not Assigned",
      status: "Active"
    };

    setMemberList([...memberList, newMember]);
    setFormData({ name: "", plan: "Basic", trainer: "" });
  }

  return (
    <div className="space-y-6">
      <section className="page-heading">
        <h2>Members</h2>
        <p>Search members and add a new sample member using React state.</p>
      </section>

      <form onSubmit={addMember} className="card grid gap-4 md:grid-cols-4">
        <input
          type="text"
          name="name"
          placeholder="Member name"
          value={formData.name}
          onChange={handleChange}
          className="input-box"
        />
        <select name="plan" value={formData.plan} onChange={handleChange} className="input-box">
          <option>Basic</option>
          <option>Silver</option>
          <option>Gold</option>
          <option>Platinum</option>
        </select>
        <input
          type="text"
          name="trainer"
          placeholder="Trainer name"
          value={formData.trainer}
          onChange={handleChange}
          className="input-box"
        />
        <button type="submit" className="primary-btn">Add Member</button>
      </form>

      <div className="card">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="section-heading">Member List</h3>
          <input
            type="text"
            placeholder="Search member"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input-box sm:max-w-xs"
          />
        </div>

        <div className="overflow-x-auto">
        <table className="app-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Membership</th>
              <th>Trainer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.plan}</td>
                <td>{member.trainer}</td>
                <td>
                  <span className={member.status === "Active" ? "status-active" : "status-pending"}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
