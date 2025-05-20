import React from "react";
import { useState } from "react";
import backgroundImage from "../assets/back.jpg";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySigned, setStaySigned] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Stay Signed In:", staySigned);
  };

  return (
    <div id="page" className="login-container">
      <img src={backgroundImage} alt="Image" className="background-img" />
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-box">
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              required
            />
          </div>
          <div className="input-box">
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              required
            />
          </div>
          <div className="checkbox-container flex items-center gap-2.5 mb-7">
            <input
              type="checkbox"
              className="checkbox"
              id="stay-signed"
              name="stay-signed"
              value={staySigned}
              checked={staySigned}
              onChange={(e) => setStaySigned(e.target.checked)}
            />
            <label htmlFor="stay-signed">Stay Signed In</label>
          </div>
          <button
            type="submit"
            className="submit-btn p-2 border-2 rounded-md w-12/12"
          >
            Login
          </button>
          <div className="extra-feature flex flex-row items-center mt-5 w-12/12">
            <p>
              <a href="/">Can't Sign In?</a>
            </p>
            <p>
              <a href="/register">Don't have an account? </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
