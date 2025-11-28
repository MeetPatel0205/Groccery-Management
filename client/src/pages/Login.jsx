import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="hero-section-login">
      <div className="section">
        <div className="toggleBtn">
          <button
            className={`section-btn ${showLogin ? "active" : ""}`}
            onClick={handleToggle}
          >
            Login
          </button>
          <button
            className={`section-btn ${!showLogin ? "active" : ""}`}
            onClick={handleToggle}
          >
            Sign Up
          </button>
        </div>

        {showLogin ? (
          <div className="login">
            <Login />
          </div>
        ) : (
          <div className="signup">
            <Signup />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
