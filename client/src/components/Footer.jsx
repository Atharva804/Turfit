import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer w-full z-10 mx-auto flex flex-col items-center">
      <div className="upper w-8/12 flex flex-col items-center">
        <h1 className="footer-heading mt-8">
          Where Your Cricket Journey Flourishes.
        </h1>
        <p className="light-text mt-8 long-para text-center">
          At Justurf, we understand that cricket is more than just a game; it's
          a passion that drives <br /> you. Whether you're a seasoned
          professional honing your skills or a budding enthusiast <br /> eager
          to learn, our turf is your stage.
        </p>
        <Link to="/register">
          <button className="join-btn mt-10 mb-10">Join Us!</button>
        </Link>
      </div>
      <div className="horizontal-line w-10/12"></div>
      <div className="lower w-10/12 flex flex-row mt-10">
        <div className="first-col justify-self-start w-1/3 flex flex-col gap-6">
          <h3 className="footer-sub-heading">Contact Us</h3>
          <div className="call-us">
            <h4 className="light-text">Call Us</h4>
            <p className="footer-sub-heading">+91 12345 67890</p>
          </div>
          <div className="emial-us">
            <h4 className="light-text">Email Us</h4>
            <p className="footer-sub-heading">test@gmail.com</p>
          </div>
        </div>
        <div className="second-col justify-self-center w-1/3 flex flex-col gap-2">
          <h3 className="footer-sub-heading">Support</h3>
          <h4 className="light-text">Contact Us</h4>
          <h4 className="light-text">About Us</h4>
          <h4 className="light-text">Turfs</h4>
          <h4 className="light-text">Privacy Policy</h4>
          <h4 className="light-text">Terms & Conditions</h4>
        </div>
        <div className="third-col justify-self-end w-1/3 flex flex-row gap-3">
          <img className="social-icon" src={logo} />
          <img className="social-icon" src={logo} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
