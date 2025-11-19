import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "../styles/Register.css";

function Register({ token, setToken }) {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({});
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        }
      );
      const token = await res.json();
      if (token.err) throw token;
      localStorage.setItem("token", token.token);
      setToken(token.token);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  console.log(token);
  if (token) return <Navigate to="/" />;
  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register here</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">
            Email
            <input
              className="register-input"
              type="text"
              name="email"
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </label>
          <label className="register-label">
            Password
            <input
              className="register-input"
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Create a password"
            />
          </label>
          <button type="submit" className="register-button">
            Submit
          </button>
        </form>
        {error && <p>{error.err}</p>}
      </div>
    </div>
  );
}

export default Register;
