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
    <div>
      <h1>Login here</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" name="email" onChange={handleInput} />
        </label>
        <label>
          Password
          <input type="password" name="password" onChange={handleInput} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
