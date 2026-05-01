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
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 32px;
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

  .create-form {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 28px;
  }

  .form-row {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .field-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 14px;
    color: #fff;
    outline: none;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .field-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.05);
  }

  .field-input::placeholder { color: rgba(255,255,255,0.2); }

  .btn-create {
    padding: 11px 22px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
    transition: opacity 0.2s;
  }

  .btn-create:hover { opacity: 0.85; }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .project-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    transition: all 0.2s;
  }

  .project-card:hover {
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-2px);
  }

  .project-icon {
    width: 44px;
    height: 44px;
    background: rgba(99,102,241,0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 16px;
  }

  .project-name {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 6px;
  }

  .project-date {
    font-size: 12px;
    color: rgba(255,255,255,0.3);
  }

  .project-actions {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .btn-delete {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: rgba(255,255,255,0.35);
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .btn-delete:hover {
    border-color: rgba(248,113,113,0.4);
    color: #f87171;
    background: rgba(248,113,113,0.1);
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 64px;
    color: rgba(255,255,255,0.2);
    font-size: 14px;
    background: #13131a;
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 16px;
  }

  .empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.4; }

  .form-title {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.7px;
  }

  .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    background: rgba(99,102,241,0.15);
    border-radius: 20px;
    font-size: 11px;
    color: #818cf8;
    font-weight: 600;
  }
`;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName") || "User";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch {}
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await API.post("/projects", { name });
      setName("");
      fetchProjects();
    } catch {
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch {
      alert("Error deleting project");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getProjectEmoji = (name) => {
    const emojis = ["🚀", "💡", "⚡", "🎯", "🔥", "🌟", "🛠️", "📦"];
    return emojis[name.charCodeAt(0) % emojis.length];
  };

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
            <Link className="nav-link active" to="/projects">Projects</Link>
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
            <div>
              <h1 className="page-title">Projects</h1>
              <p className="page-subtitle">{projects.length} project{projects.length !== 1 ? "s" : ""} total</p>
            </div>
            {role === "Admin" && (
              <span className="admin-badge">👑 Admin</span>
            )}
          </div>

          {role === "Admin" && (
            <div className="create-form">
              <div className="form-title">New Project</div>
              <div className="form-row">
                <input
                  className="field-input"
                  placeholder="Enter project name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                />
                <button className="btn-create" onClick={handleCreate} disabled={loading}>
                  {loading ? "Creating..." : "+ Create Project"}
                </button>
              </div>
            </div>
          )}

          <div className="projects-grid">
            {projects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🗂️</div>
                <div>No projects yet{role === "Admin" ? ". Create your first one!" : "."}</div>
              </div>
            ) : (
              projects.map(p => (
                <div key={p._id} className="project-card">
                  {role === "Admin" && (
                    <div className="project-actions">
                      <button className="btn-delete" onClick={() => handleDelete(p._id)} title="Delete">✕</button>
                    </div>
                  )}
                  <div className="project-icon">{getProjectEmoji(p.name)}</div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-date">
                    Created {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "recently"}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Projects;
