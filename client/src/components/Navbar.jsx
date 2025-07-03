"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      dispatch(logoutUser());
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold">Turfit</span>
            </div>
          </Link>

          {/* Desktop Menu */}
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

          {/* Desktop Buttons */}
          <div className="navbar-btns">
            {user ? (
              <>
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

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" className="navbar-link" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link" onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/turfs" className="navbar-link" onClick={closeMobileMenu}>
              Turfs
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="navbar-link"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="navbar-btns">
          {user ? (
            <>
              {user.role === "owner" ? (
                <Link
                  to="/owner-dashboard"
                  className="signup-btn nav-btn"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="signup-btn nav-btn"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              )}
              <button onClick={handleLogout} className="login-btn nav-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMobileMenu}>
                <button className="login-btn nav-btn">Login</button>
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <button className="signup-btn nav-btn">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
