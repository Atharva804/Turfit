import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    // <div className="footer w-full z-10 mx-auto flex flex-col items-center">
    //   <div className="upper w-8/12 flex flex-col items-center">
    //     <h1 className="footer-heading mt-8">
    //       Where Your Cricket Journey Flourishes.
    //     </h1>
    //     <p className="light-text mt-8 long-para text-center">
    //       At Justurf, we understand that cricket is more than just a game; it's
    //       a passion that drives <br /> you. Whether you're a seasoned
    //       professional honing your skills or a budding enthusiast <br /> eager
    //       to learn, our turf is your stage.
    //     </p>
    //     <Link to="/register">
    //       <button
    //         className="join-btn mt-10 mb-10"
    //         onClick={() => {
    //           window.scrollTo(0, 0);
    //         }}
    //       >
    //         Join Us!
    //       </button>
    //     </Link>
    //   </div>
    //   <div className="horizontal-line w-10/12"></div>
    //   <div className="lower w-10/12 flex flex-row mt-10">
    //     <div className="first-col justify-self-start w-1/3 flex flex-col gap-6">
    //       <h3 className="footer-sub-heading">Contact Us</h3>
    //       <div className="call-us">
    //         <h4 className="light-text">Call Us</h4>
    //         <p className="footer-sub-heading">+91 12345 67890</p>
    //       </div>
    //       <div className="emial-us">
    //         <h4 className="light-text">Email Us</h4>
    //         <p className="footer-sub-heading">test@gmail.com</p>
    //       </div>
    //     </div>
    //     <div className="second-col justify-self-center w-1/3 flex flex-col gap-2">
    //       <h3 className="footer-sub-heading">Support</h3>
    //       <h4 className="light-text">Contact Us</h4>
    //       <h4 className="light-text">About Us</h4>
    //       <h4 className="light-text">Turfs</h4>
    //       <h4 className="light-text">Privacy Policy</h4>
    //       <h4 className="light-text">Terms & Conditions</h4>
    //     </div>
    //     <div className="third-col justify-self-end w-1/3 flex flex-row gap-3">
    //       <img className="social-icon" src={logo} />
    //       <img className="social-icon" src={logo} />
    //     </div>
    //   </div>
    // </div>
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold">Turfit</span>
            </div>
            <p className="text-gray-400">
              Making sports accessible to everyone, one booking at a time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/turfs" className="hover:text-white">
                  Turfs
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>hello@Turfit.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Indore, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Turfit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
