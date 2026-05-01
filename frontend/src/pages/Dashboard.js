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
  }

  .page-header {
    margin-bottom: 36px;
  }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }

  .page-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin-top: 4px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .stat-card:hover { border-color: rgba(255,255,255,0.15); }

  .stat-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.7px;
    margin-bottom: 12px;
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }

  .stat-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    opacity: 0.5;
  }

  .stat-total .stat-value { color: #fff; }
  .stat-pending .stat-value { color: #fbbf24; }
  .stat-completed .stat-value { color: #34d399; }
  .stat-overdue .stat-value { color: #f87171; }

  .stat-total { border-top: 2px solid rgba(99,102,241,0.4); }
  .stat-pending { border-top: 2px solid rgba(251,191,36,0.4); }
  .stat-completed { border-top: 2px solid rgba(52,211,153,0.4); }
  .stat-overdue { border-top: 2px solid rgba(248,113,113,0.4); }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 20px;
  }

  .quick-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 40px;
  }

  .action-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 28px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 18px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .action-card:hover {
    border-color: rgba(99,102,241,0.4);
    background: rgba(99,102,241,0.05);
    transform: translateY(-1px);
  }

  .action-card.teal:hover {
    border-color: rgba(20,184,166,0.4);
    background: rgba(20,184,166,0.05);
  }

  .action-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .action-icon.purple { background: rgba(99,102,241,0.15); }
  .action-icon.teal { background: rgba(20,184,166,0.15); }

  .action-content {}

  .action-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
  }

  .action-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
  }

  .recent-section {}

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .task-item {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .task-item.overdue { border-left: 3px solid #f87171; }

  .task-item-left { flex: 1; }

  .task-title {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 4px;
  }

  .task-meta {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.3px;
  }

  .badge-pending {
    background: rgba(251,191,36,0.15);
    color: #fbbf24;
  }

  .badge-completed {
    background: rgba(52,211,153,0.15);
    color: #34d399;
  }

  .badge-overdue {
    background: rgba(248,113,113,0.15);
    color: #f87171;
  }

  .empty-state {
    text-align: center;
    padding: 48px;
    color: rgba(255,255,255,0.25);
    font-size: 14px;
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
  }
`;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/tasks");
        const all = res.data;
        setTasks(all);
        const now = new Date();
        setStats({
          total: all.length,
          pending: all.filter(t => t.status === "Pending").length,
          completed: all.filter(t => t.status === "Completed").length,
          overdue: all.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== "Completed").length,
        });
      } catch {}
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isOverdue = (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Completed";

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
            <Link className="nav-link active" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/projects">Projects</Link>
            <Link className="nav-link" to="/tasks">Tasks</Link>
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
          <div className="page-header">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Overview of your team's work</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-total">
              <div className="stat-icon">📋</div>
              <div className="stat-label">Total Tasks</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card stat-pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-label">Pending</div>
              <div className="stat-value">{stats.pending}</div>
            </div>
            <div className="stat-card stat-completed">
              <div className="stat-icon">✅</div>
              <div className="stat-label">Completed</div>
              <div className="stat-value">{stats.completed}</div>
            </div>
            <div className="stat-card stat-overdue">
              <div className="stat-icon">🔴</div>
              <div className="stat-label">Overdue</div>
              <div className="stat-value">{stats.overdue}</div>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/projects" className="action-card">
              <div className="action-icon purple">🗂️</div>
              <div className="action-content">
                <div className="action-title">Manage Projects</div>
                <div className="action-desc">Create and organize your projects</div>
              </div>
            </Link>
            <Link to="/tasks" className="action-card teal">
              <div className="action-icon teal">✏️</div>
              <div className="action-content">
                <div className="action-title">Manage Tasks</div>
                <div className="action-desc">Assign, track and update tasks</div>
              </div>
            </Link>
          </div>

          <div className="recent-section">
            <div className="section-title">Recent Tasks</div>
            {tasks.length === 0 ? (
              <div className="empty-state">No tasks yet. Create your first task!</div>
            ) : (
              <div className="task-list">
                {tasks.slice(0, 6).map(t => (
                  <div key={t._id} className={`task-item ${isOverdue(t) ? "overdue" : ""}`}>
                    <div className="task-item-left">
                      <div className="task-title">{t.title}</div>
                      <div className="task-meta">
                        {t.project?.name} {t.assignedTo ? `· ${t.assignedTo.name}` : ""} · Due {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}
                      </div>
                    </div>
                    <span className={`badge badge-${isOverdue(t) ? "overdue" : t.status === "Completed" ? "completed" : "pending"}`}>
                      {isOverdue(t) ? "Overdue" : t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
