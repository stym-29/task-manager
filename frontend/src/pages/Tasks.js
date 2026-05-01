import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    height: 60px;
    background: rgba(19,19,26,0.8);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
  }

  .nav-logo-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #6366f1, #14b8a6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }

  .nav-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-link {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    transition: all 0.2s;
    font-weight: 500;
  }

  .nav-link:hover, .nav-link.active {
    color: #fff;
    background: rgba(255,255,255,0.07);
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nav-user {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: rgba(255,255,255,0.6);
  }

  .nav-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #14b8a6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
  }

  .btn-logout {
    padding: 5px 12px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.12);
    background: transparent;
    color: rgba(255,255,255,0.5);
    font-size: 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .btn-logout:hover {
    background: rgba(239,68,68,0.1);
    border-color: rgba(239,68,68,0.3);
    color: #f87171;
  }

  .main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 32px;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 28px;
    align-items: start;
  }

  .sidebar {}

  .sidebar-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 24px;
    position: sticky;
    top: 80px;
  }

  .sidebar-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 20px;
  }

  .field-group { margin-bottom: 14px; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.7px;
    margin-bottom: 7px;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    padding: 10px 13px;
    font-size: 13px;
    color: #fff;
    outline: none;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .field-input:focus {
    border-color: rgba(99,102,241,0.5);
    background: rgba(99,102,241,0.05);
  }

  .field-input::placeholder { color: rgba(255,255,255,0.2); }

  select.field-input option {
    background: #1e1e2e;
    color: #fff;
  }

  .btn-create-task {
    width: 100%;
    padding: 11px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.2s;
    margin-top: 4px;
  }

  .btn-create-task:hover { opacity: 0.85; }

  .content {}

  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.4px;
  }

  .filter-bar {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(255,255,255,0.45);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.2);
  }

  .filter-btn.active-all {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    color: #fff;
  }

  .filter-btn.active-pending {
    background: rgba(251,191,36,0.12);
    border-color: rgba(251,191,36,0.3);
    color: #fbbf24;
  }

  .filter-btn.active-completed {
    background: rgba(52,211,153,0.12);
    border-color: rgba(52,211,153,0.3);
    color: #34d399;
  }

  .filter-btn.active-overdue {
    background: rgba(248,113,113,0.12);
    border-color: rgba(248,113,113,0.3);
    color: #f87171;
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 18px 20px;
    transition: border-color 0.2s;
  }

  .task-card:hover { border-color: rgba(255,255,255,0.13); }

  .task-card.is-overdue { border-left: 3px solid rgba(248,113,113,0.7); }
  .task-card.is-completed { opacity: 0.65; }

  .task-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 12px;
  }

  .task-name {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    line-height: 1.4;
    flex: 1;
  }

  .task-card.is-completed .task-name {
    text-decoration: line-through;
    color: rgba(255,255,255,0.4);
  }

  .badge {
    font-size: 10px;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 20px;
    letter-spacing: 0.3px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .badge-pending { background: rgba(251,191,36,0.15); color: #fbbf24; }
  .badge-completed { background: rgba(52,211,153,0.15); color: #34d399; }
  .badge-overdue { background: rgba(248,113,113,0.15); color: #f87171; }

  .task-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: rgba(255,255,255,0.35);
  }

  .meta-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
  }

  .task-bottom {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .status-select {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 7px 10px;
    font-size: 12px;
    color: rgba(255,255,255,0.7);
    outline: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .status-select:focus { border-color: rgba(99,102,241,0.4); }
  .status-select option { background: #1e1e2e; color: #fff; }

  .btn-del-task {
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    background: transparent;
    color: rgba(255,255,255,0.3);
    font-size: 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .btn-del-task:hover {
    border-color: rgba(248,113,113,0.4);
    color: #f87171;
    background: rgba(248,113,113,0.08);
  }

  .empty-state {
    text-align: center;
    padding: 56px 32px;
    color: rgba(255,255,255,0.2);
    font-size: 14px;
    background: #13131a;
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 16px;
  }

  .empty-icon { font-size: 32px; margin-bottom: 10px; opacity: 0.4; }

  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: rgba(99,102,241,0.2);
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    color: #818cf8;
    margin-left: 8px;
  }
`;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const fetchAll = async () => {
    try {
      const [tp, tu, tt] = await Promise.all([
        API.get("/projects"),
        API.get("/auth/users"),
        API.get("/tasks"),
      ]);
      setProjects(tp.data);
      setUsers(tu.data);
      setTasks(tt.data);
    } catch {}
  };

  useEffect(() => { fetchAll(); }, []);

  const handleCreate = async () => {
    if (!title || !projectId || !dueDate) { alert("Fill all fields"); return; }
    try {
      await API.post("/tasks", { title, projectId, assignedTo, dueDate });
      setTitle(""); setProjectId(""); setAssignedTo(""); setDueDate("");
      fetchAll();
    } catch { alert("Error creating task"); }
  };

  const handleStatus = async (id, status) => {
    try { await API.put(`/tasks/${id}`, { status }); fetchAll(); } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try { await API.delete(`/tasks/${id}`); fetchAll(); } catch {}
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const isOverdue = (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Completed";

  const filtered = tasks.filter(t => {
    if (filter === "Pending") return t.status === "Pending";
    if (filter === "Completed") return t.status === "Completed";
    if (filter === "Overdue") return isOverdue(t);
    return true;
  });

  const overdueCnt = tasks.filter(isOverdue).length;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="navbar">
          <Link to="/dashboard" className="nav-logo">
            <div className="nav-logo-icon">⚡</div>
            <span className="nav-logo-text">TaskFlow</span>
          </Link>
          <div className="nav-links">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/projects">Projects</Link>
            <Link className="nav-link active" to="/tasks">Tasks</Link>
          </div>
          <div className="nav-right">
            <div className="nav-user">
              <div className="nav-avatar">{initials}</div>
              <span>{userName}</span>
            </div>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <main className="main">
          <div className="sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">New Task</div>

              <div className="field-group">
                <label className="field-label">Title</label>
                <input className="field-input" placeholder="Task title..." value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="field-group">
                <label className="field-label">Project</label>
                <select className="field-input" value={projectId} onChange={e => setProjectId(e.target.value)}>
                  <option value="">Select project</option>
                  {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>

              <div className="field-group">
                <label className="field-label">Assign to</label>
                <select className="field-input" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
                  <option value="">Select member</option>
                  {users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}
                </select>
              </div>

              <div className="field-group">
                <label className="field-label">Due Date</label>
                <input className="field-input" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>

              <button className="btn-create-task" onClick={handleCreate}>+ Create Task</button>
            </div>
          </div>

          <div className="content">
            <div className="content-header">
              <h1 className="page-title">
                Tasks
                <span className="count-badge">{tasks.length}</span>
              </h1>
            </div>

            <div className="filter-bar">
              {["All", "Pending", "Completed", "Overdue"].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? `active-${f.toLowerCase()}` : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "Overdue" && overdueCnt > 0 ? `Overdue (${overdueCnt})` : f}
                </button>
              ))}
            </div>

            <div className="tasks-list">
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  <div>No {filter !== "All" ? filter.toLowerCase() + " " : ""}tasks found</div>
                </div>
              ) : (
                filtered.map(t => {
                  const over = isOverdue(t);
                  return (
                    <div
                      key={t._id}
                      className={`task-card ${over ? "is-overdue" : ""} ${t.status === "Completed" ? "is-completed" : ""}`}
                    >
                      <div className="task-top">
                        <div className="task-name">{t.title}</div>
                        <span className={`badge badge-${over ? "overdue" : t.status === "Completed" ? "completed" : "pending"}`}>
                          {over ? "Overdue" : t.status}
                        </span>
                      </div>
                      <div className="task-meta">
                        {t.project && (
                          <div className="meta-item">🗂️ {t.project.name}</div>
                        )}
                        {t.assignedTo && (
                          <>
                            <div className="meta-dot"></div>
                            <div className="meta-item">👤 {t.assignedTo.name}</div>
                          </>
                        )}
                        {t.dueDate && (
                          <>
                            <div className="meta-dot"></div>
                            <div className="meta-item">📅 {new Date(t.dueDate).toLocaleDateString()}</div>
                          </>
                        )}
                      </div>
                      <div className="task-bottom">
                        <select
                          className="status-select"
                          value={t.status}
                          onChange={e => handleStatus(t._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button className="btn-del-task" onClick={() => handleDelete(t._id)}>Delete</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Tasks;
