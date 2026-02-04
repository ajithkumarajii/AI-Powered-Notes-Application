import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authThunks";
import Spinner from "../utils/spinner";
import ErrorMessage from "../utils/errorMessage";
import { useNavigate } from "react-router-dom";
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
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </button>
        {error && <ErrorMessage message={error} />}
        {authError && <ErrorMessage message={authError} />}
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
