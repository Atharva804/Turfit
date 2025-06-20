import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import axios from "../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout"); // Clears the HttpOnly cookie
      dispatch(logoutUser());
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <nav className="navbar sticky top-0 w-full bg-white/30 backdrop-blur-md shadow-md z-50">
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
            {" "}
            {user.role === "owner" ? (
              <Link to="/owner-dashboard" className="signup-btn nav-btn">
                Profile
              </Link>
            ) : (
              <Link to="/dashboard" className="signup-btn nav-btn">
                Profile
              </Link>
            )}
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
