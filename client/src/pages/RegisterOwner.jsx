import React from "react";
import { useState } from "react";
import backgroundImage from "../assets/back.jpg";
import "./Login.css";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function RegisterOwner() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register-owner", {
        name,
        email,
        phone,
        password,
        role: "owner",
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
      <div className="form-container">
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
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="PHONE NUMBER"
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
          <div className="extra-feature flex flex-row items-center mt-5 w-12/12">
            <p>
              <a href="/login">Already Have an Account?</a>
            </p>
            <p>
              <a href="/register">User?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterOwner;
