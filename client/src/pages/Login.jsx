import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/back.jpg";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import "./Login.css";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import axios from "../utils/axiosInstance";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySigned, setStaySigned] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      dispatch(setUser(res.data.user)); // Store in Redux
      // const user = res.data.user;
      // Save user data (not token)
      // setUserOri(user);
      navigate("/"); // protected page
    } catch (err) {
      console.error(err.response.data);
      alert("Login failed");
    }
  };

  return (
    <div id="page" className="login-container">
      <img src={backgroundImage} alt="Image" className="background-img" />
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="login-form">
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
          <div className="google-btn mt-3">
            <GoogleLoginBtn role="user" />
          </div>
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
