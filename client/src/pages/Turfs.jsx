import React, { useState, useEffect } from "react";
import "./Turfs.css";
import TurfCard from "../components/TurfCard";
import apiService from "../services/apiService";

const Turfs = () => {
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await apiService.getTurfs();
        setTurfs(response.data);
      } catch (error) {
        console.error("Error fetching turfs:", error);
      }
    };
    fetchTurfs();
  }, []);
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
        {turfs.map((i) => (
          <TurfCard key={i._id} turf={i} />
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
