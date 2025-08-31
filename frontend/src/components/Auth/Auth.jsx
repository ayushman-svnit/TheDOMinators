import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Auth = ({ authType, setUser, setToken, setIsAdmin }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setError("");
  }, [authType]);

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
      
      const res = await axios.post(endpoint, payload);
      localStorage.setItem("token", res.data.token);
        setToken(res.data.token);;
      setUser(res.data.user);
      setIsAdmin(res.data.isAdmin);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || 
        (authType === "login" ? "Login failed" : "Registration failed"));
    }
  };

  const toggleAuthType = () => {
    setIsRotating(true);
    setTimeout(() => {
      navigate(authType === "login" ? "/register" : "/login");
      setIsRotating(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isRotating ? "rotate" : ""} ${authType === "register" ? "right-panel-active" : ""}`}>
        {/* Login Form */}
        <div className="auth-form login-form">
          <h2>Sign in</h2>
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
            {error && authType === "login" && <div className="error-message">{error}</div>}
            <button type="submit" className="auth-button">SIGN IN</button>
          </form>
        </div>

        {/* Register Form */}
        <div className="auth-form register-form">
          <h2>Create Account</h2>
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
            {error && authType === "register" && <div className="error-message">{error}</div>}
            <button type="submit" className="auth-button">SIGN UP</button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>To keep connected with us please login with your personal info</p>
              <button 
                className="ghost-button" 
                onClick={toggleAuthType}
                disabled={isRotating}
              >
                SIGN IN
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Register with your personal details to use all of site features</p>
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

export default Auth;