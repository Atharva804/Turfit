import React, { useState, useEffect } from "react";
import "./Turfs.css";
import TurfCard from "../components/TurfCard";
import apiService from "../services/apiService";

const Turfs = () => {
  const [turfs, setTurfs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const turfsPerPage = 6;

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

  const totalPageNumber = Math.ceil(turfs.length / 6);
  const indexOfLast = currentPage * turfsPerPage;
  const indexOfFirst = indexOfLast - turfsPerPage;
  const currentTurfs =
    searchResult.length > 0
      ? searchResult.slice(indexOfFirst, indexOfLast)
      : turfs.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPageNumber));
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const turfName = e.target.value;
    setSearchValue(turfName);
    if (turfName == "") {
      setSearchResult([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue == "") {
      alert("please enter a name.");
    } else {
      const res = await apiService.searchTurf(searchValue);
      if (res.length > 0) {
        setSearchResult(res);
      } else {
        alert("No turf found");
      }
    }
  };

  return (
    <div className="turf-container w-10/12 mx-auto flex flex-col items-center">
      <div className="search-container flex flex-row justify-between items-center mx-auto my-4 bg-gray-100 p-4 rounded-2xl shadow-md w-full">
        <div className="search-bar">
          <form onSubmit={handleSearch} className="flex flex-row gap-3">
            <input
              type="text"
              placeholder="Search for turfs..."
              onChange={handleChange}
              className="search-input rounded-md border-none w-full bg-white p-2"
            />
            <button type="submit" className="search-button search-btn">
              Search
            </button>
          </form>
        </div>
        <div className="page-nav flex flex-row">
          <button className="page-button" onClick={handlePreviousPage}>
            &lt;
          </button>
          {Array.from({ length: totalPageNumber }, (_, index) => (
            <button
              key={index}
              className="page-button"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button className="page-button" onClick={handleNextPage}>
            &gt;
          </button>
        </div>
      </div>
      <div className="turfs-list w-fullrounded-2xl my-3">
        {currentTurfs.map((i) => (
          <TurfCard key={i._id} turf={i} />
        ))}
      </div>
      <div className="page-nav flex flex-row mt-3 mb-8">
        <button className="page-button" onClick={handlePreviousPage}>
          &lt;
        </button>
        {Array.from({ length: totalPageNumber }, (_, index) => (
          <button
            key={index}
            className="page-button"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="page-button" onClick={handleNextPage}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Turfs;
