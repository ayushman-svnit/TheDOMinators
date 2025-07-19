import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth1.css";

const PasswordRecovery = ({ setUser }) => {
  const [step, setStep] = useState(1); // 1: forgot, 2: verify, 3: reset
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await axios.post("/api/users/forgot-password", { email: formData.email });
      setSuccess("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await axios.post("/api/users/verify-otp", {
        email: formData.email,
        otp: formData.otp
      });
      setSuccess("OTP verified successfully");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("/api/users/reset-password", {
        email: formData.email,
        newPassword: formData.newPassword
      });
      
      // Automatically log the user in
      const res = await axios.post("/api/users/login", {
        email: formData.email,
        password: formData.newPassword
      });
      
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/login");
    }
    setError("");
    setSuccess("");
  };

  return (
    <div className="auth-container">
      <div className="recovery-card">
        {/* Forgot Password Step */}
        {step === 1 && (
          <div className="recovery-form">
            <h2>Forgot Password</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleForgotPassword}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? "SENDING..." : "SEND OTP"}
              </button>
            </form>
            <button 
              className="back-button"
              onClick={goBack}
            >
              Back to Login
            </button>
          </div>
        )}

        {/* Verify OTP Step */}
        {step === 2 && (
          <div className="recovery-form">
            <h2>Verify OTP</h2>
            <p className="recovery-subtext">
              We sent a 6-digit code to {formData.email}
            </p>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleVerifyOtp}>
              <div className="input-group">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength="6"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? "VERIFYING..." : "VERIFY OTP"}
              </button>
            </form>
            <button 
              className="back-button"
              onClick={goBack}
            >
              Resend OTP
            </button>
          </div>
        )}

        {/* Reset Password Step */}
        {step === 3 && (
          <div className="recovery-form">
            <h2>Reset Password</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;