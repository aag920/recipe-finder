import React, { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [loginData, setLoginData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const token = await res.json();
    console.log(token);
  };
  const handleInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login here</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              className="login-input"
              type="text"
              name="email"
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </label>
          <label className="login-label">
            Password
            <input
              className="login-input"
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Enter your password"
            />
          </label>
          <button className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
