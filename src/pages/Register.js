import React, { useState } from "react";
import "../styles/Register.css";

function Register() {
  const [registerData, setRegisterData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    const token = await res.json();
    console.log(token);
  };
  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
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
          <button className="register-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
