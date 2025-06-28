import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import "./TurfCard.css";

const TurfCard = ({ turf }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="turf-card rounded-2xl w-full drop-shadow-lg mb-4">
      <img
        src={`${apiUrl}${turf.images[0]}`}
        alt="Turf"
        className="turf-image w-full rounded-t-2xl"
      />
      <div className="turf-details p-4 w-full flex flex-col">
        <h2 className="turf-name mt-1">{turf.name}</h2>
        <p className="turf-description mt-2">{turf.description}</p>
        <div className="loc-price flex flex-row items-center mt-2">
          <img src={logo} className="loc-logo" />
          <p className="turf-location flex-1/3 ml-2">{turf.address}</p>
          <p className="turf-price flex-1/3">Price: {turf.price} per hour</p>
        </div>
        <div className="horizontal-line w-11/12 mt-4"></div>
        <div className="buttons flex flex-row justify-between mt-4 mb-1">
          <Link to={`/book/${turf._id}`}>
            <button
              className="book-btn"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Book
            </button>
          </Link>
          <Link to={`/turf/${turf._id}`}>
            <button
              className="details-btn"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
