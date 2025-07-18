import React from "react";
import { useState } from "react";
import backgroundImage from "../assets/back.jpg";
import "./Login.css";
import axios from "../utils/axiosInstance";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
        role: "user", // or "owner"
      });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err.response.data);
      alert("Register failed");
    }
  };

  return (
    <div className="register-container">
      <img src={backgroundImage} alt="Image" className="background-img" />
      <div className="form-container bg-white/50 backdrop-blur-md shadow-md">
        <h1>Sign Up</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-box">
            <input
              className="input-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="FULL NAME"
              required
            />
          </div>
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
          <button
            type="submit"
            className="submit-btn p-2 border-2 rounded-md w-12/12"
          >
            Sign Up
          </button>
          <div className="google-btn mt-3">
            <GoogleLoginBtn role="user" />
          </div>
          <div className="extra-feature flex flex-row items-center mt-5 w-12/12">
            <p>
              <a href="/login">Already Have an Account?</a>
            </p>
            <p>
              <a href="/register-owner">Turf Owner?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterUser;
