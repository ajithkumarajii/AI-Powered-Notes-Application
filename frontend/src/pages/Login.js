import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authThunks";
import Spinner from "../utils/spinner";
import ErrorMessage from "../utils/errorMessage";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authError = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await dispatch(login({ email, password }));
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-sidebar">
        <div className="sidebar-content">
          <div className="auth-logo">
            <div className="logo-icon">📝</div>
            <h1 className="logo-text">AI Notes</h1>
          </div>
          <h2 className="sidebar-title">Intelligent Note Taking</h2>
          <p className="sidebar-description">
            Write, organize, and discover insights in your notes with AI-powered summarization.
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>AI-Powered Summaries</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span>Organize Your Ideas</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant Access</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to access your notes</p>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? <Spinner /> : "Sign In"}
          </button>

          {error && <ErrorMessage message={error} />}
          {authError && <ErrorMessage message={authError} />}

          <div className="auth-footer">
            <span>New here? </span>
            <Link to="/signup">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
