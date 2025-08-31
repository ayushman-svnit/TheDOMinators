import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth1.css";

const AuthPage = ({ authType, setUser, setToken, setIsAdmin }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = authType === "login" ? "/api/users/login" : "/api/users/register";
      const payload = authType === "login"
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(endpoint, payload, {withCredentials: true});

      // Optional: only if your backend sends a token (JWT-based)
        if(res.data.token) {

          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);          
          // ✅ Fetch user from session and update AuthContext
          
          setUser(res.data.user); // optional, only if needed in this component
          setIsAdmin(res.data.isAdmin);
        }
          navigate("/");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
        (authType === "login" ? "Login failed" : "Registration failed")
      );
    }
  };

  const toggleAuthType = () => {
    setIsRotating(true);
    setTimeout(() => {
      navigate(authType === "login" ? "/register" : "/login");
      setIsRotating(false);
    }, 500);
  };

  const showForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isRotating ? "rotate" : ""} ${authType === "register" ? "right-panel-active" : ""
        }`}>
        {/* Login Form */}
        <div className="auth-form login-form">
          <h2 className="auth-h22">Sign in</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              {authType === "login" ? "SIGN IN" : "SIGN UP"}
            </button>
            {authType === "login" && (
              <button
                type="button"
                className="forgot-button"
                onClick={showForgotPassword}
              >
                Forgot Password?
              </button>
            )}
          </form>
        </div>

        {/* Register Form */}
        <div className="auth-form register-form">
          <h2>Create Account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button">SIGN UP</button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2 className = "auth-h2">Welcome Back!</h2>
              <p className = "auth-p">To keep connected with us please login with your personal info</p>
              <button
                className="ghost-button"
                onClick={toggleAuthType}
                disabled={isRotating}
              >
                SIGN IN
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2 className = "auth-h2">Hello, Friend!</h2>
              <p className = "auth-p">Register with your personal details to use all of site features</p>
              <button
                className="ghost-button"
                onClick={toggleAuthType}
                disabled={isRotating}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;