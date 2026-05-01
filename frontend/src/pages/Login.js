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
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    top: -200px;
    right: -100px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%);
    bottom: -100px;
    left: -100px;
    pointer-events: none;
  }

  .auth-card {
    width: 420px;
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 48px 44px;
    position: relative;
    z-index: 1;
  }

  .auth-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
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
    letter-spacing: -0.3px;
  }

  .auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: -0.5px;
  }

  .auth-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    margin: 0 0 32px;
  }

  .field-group {
    margin-bottom: 16px;
  }

  .field-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 8px;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 14px;
    color: #fff;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
  }

  .field-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.05);
  }

  .field-input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .btn-primary {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.2px;
    transition: opacity 0.2s, transform 0.1s;
  }

  .btn-primary:hover { opacity: 0.9; }
  .btn-primary:active { transform: scale(0.99); }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .auth-footer {
    text-align: center;
    margin-top: 24px;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
  }

  .auth-footer a {
    color: #818cf8;
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
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userName", res.data.user.name);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon">⚡</div>
            <span className="auth-logo-text">Task Manager</span>
          </div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your workspace</p>

          {error && <div className="error-msg">{error}</div>}

          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              className="field-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="field-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          <button className="btn-primary" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
