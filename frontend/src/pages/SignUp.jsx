import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Sign Up Submission
  const handleSignUp = async () => {
    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          ...formData,
          role,
        }
      );

      if (response.data.success) {
        navigate("/signin");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Side Image Section */}
      <div
        style={{
          width: "50%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="signup.jpg"
          alt="Signup"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{ position: "absolute", textAlign: "center", color: "white" }}
        >
          <h1>Hello Friend</h1>
          <p>To keep connected with us, provide us with your information</p>
          <Link to="/signin">
            <button
              style={{
                background: "#444",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side Form Section */}
      <div className="signup-container">
        {/* Logo Section */}
        <div className="logo">
          Event <span className="highlight">Go</span>
        </div>

        {/* Title */}
        <h2 className="title">Sign Up to Event Go</h2>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Name Input */}
        <div className="input-group">
          <label>YOUR NAME</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email Input */}
        <div className="input-group">
          <label>YOUR EMAIL</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label>YOUR PASSWORD</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Role Selection */}
        <div className="input-group">
          <label>YOUR ROLE</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Choose Your Role</option>
            <option value="ATTENDEE">Attendee</option>
            <option value="ORGANIZER">Organizer</option>
          </select>
        </div>

        {/* Submit Button */}
        <button className="signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
