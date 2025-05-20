import React from "react";
import "./Turfs.css";
import TurfCard from "../components/TurfCard";

const Turfs = () => {
  return (
    <div className="turf-container w-10/12 mx-auto flex flex-col items-center">
      <div className="search-container flex flex-row justify-between items-center mx-auto my-4 bg-gray-100 p-4 rounded-2xl shadow-md w-full">
        <div className="search-bar flex flex-row gap-3">
          <input
            type="text"
            placeholder="Search for turfs..."
            className="search-input rounded-md border-none w-full bg-white p-2"
          />
          <button className="search-button search-btn">Search</button>
        </div>
        <div className="page-nav flex flex-row">
          <button className="page-button">&lt;</button>
          <button className="page-button">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <button className="page-button">&gt;</button>
        </div>
      </div>
      <div className="turfs-list w-fullrounded-2xl my-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <TurfCard
            key={i}
            turf={{
              id: i,
              name: `Turf ${i} Name`,
              description:
                "Bada Bangarda Super Corridor Use Code RR2+1 to get 1 hour free on 2 hour booking",
              location: "Bada Bangarda",
              price: "500",
            }}
          />
        ))}
      </div>
      <div className="page-nav flex flex-row mt-3 mb-8">
        <button className="page-button">&lt;</button>
        <button className="page-button">1</button>
        <button className="page-button">2</button>
        <button className="page-button">3</button>
        <button className="page-button">&gt;</button>
      </div>
    </div>
  );
};

export default Turfs;
