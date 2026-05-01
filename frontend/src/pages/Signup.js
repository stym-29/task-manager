import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%);
    top: -200px;
    left: -100px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    pointer-events: none;
  }

  .auth-card {
    width: 440px;
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 44px;
    position: relative;
    z-index: 1;
  }

  .auth-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 32px;
  }

  .auth-logo-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1, #14b8a6);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .auth-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
  }

  .auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: -0.5px;
  }

  .auth-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin: 0 0 28px;
  }

  .field-group { margin-bottom: 14px; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 7px;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 11px 14px;
    font-size: 14px;
    color: #fff;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
  }

  .field-input:focus {
    border-color: rgba(20,184,166,0.6);
    background: rgba(20,184,166,0.04);
  }

  .field-input::placeholder { color: rgba(255,255,255,0.2); }

  .role-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 14px;
  }

  .role-btn {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03);
    color: rgba(255,255,255,0.5);
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
  }

  .role-btn.active {
    border-color: #14b8a6;
    background: rgba(20,184,166,0.12);
    color: #14b8a6;
  }

  .role-icon { margin-right: 6px; }

  .btn-primary {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #14b8a6, #0d9488);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 6px;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn-primary:hover { opacity: 0.9; }
  .btn-primary:active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .auth-footer {
    text-align: center;
    margin-top: 22px;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
  }

  .auth-footer a {
    color: #14b8a6;
    text-decoration: none;
    font-weight: 500;
  }

  .error-msg {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .success-msg {
    background: rgba(20,184,166,0.1);
    border: 1px solid rgba(20,184,166,0.2);
    color: #14b8a6;
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Member" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/signup", form);
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon">⚡</div>
            <span className="auth-logo-text">TaskFlow</span>
          </div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join your team workspace</p>

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input className="field-input" name="name" placeholder="John Doe" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label className="field-label">Email</label>
            <input className="field-input" name="email" type="email" placeholder="you@example.com" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input className="field-input" name="password" type="password" placeholder="••••••••" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label className="field-label">Role</label>
            <div className="role-row">
              <button
                className={`role-btn ${form.role === "Admin" ? "active" : ""}`}
                onClick={() => setForm({ ...form, role: "Admin" })}
              >
                <span className="role-icon">👑</span> Admin
              </button>
              <button
                className={`role-btn ${form.role === "Member" ? "active" : ""}`}
                onClick={() => setForm({ ...form, role: "Member" })}
              >
                <span className="role-icon">👤</span> Member
              </button>
            </div>
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
