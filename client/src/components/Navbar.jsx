import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import axios from "../utils/axiosInstance";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout"); // Clears the HttpOnly cookie
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <nav className="navbar shadow sticky z-50 top-0">
      <Link to="/" className="navbar-logo">
        <img src={logo} />
      </Link>
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/turfs" className="navbar-link">
              Turfs
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-btns">
        {user ? (
          <>
            <Link to="/dashboard" className="signup-btn nav-btn">
              Profile
            </Link>
            <button onClick={handleLogout} className="login-btn nav-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn nav-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="signup-btn nav-btn">Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
