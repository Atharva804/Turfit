import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import "./Navbar.css";

const Navbar = () => {
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
        <Link to="/login">
          <button className="login-btn nav-btn">Login</button>
        </Link>
        <Link to="/register">
          <button className="signup-btn nav-btn">Signup</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
