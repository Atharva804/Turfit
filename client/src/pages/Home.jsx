import React, { useRef } from "react";
import "./Turfs.css";
import "./Home.css";
import back from "../assets/back.jpg";
import down from "../assets/down.png";
import { Link } from "react-router-dom";
import TurfCard from "../components/TurfCard";

const Home = () => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="home-container">
      <div className="home-banner w-full">
        <div className="home-banner-back flex flex-col items-center justify-end">
          <img src={back} className="banner-back" />
          <button
            onClick={scrollToSection}
            className="home-banner-next-btn absolute mb-8"
          >
            <img src={down} className="w-full" />
          </button>
        </div>
        <div className="home-banner-content">
          <p className="home-banner-description">
            Beyond the Boundary, Beyond Expectations.
          </p>
          <h1 className="home-banner-title">
            The Perfect Pitch,
            <br />
            Every Time.
          </h1>
          <p className="home-banner-description">
            The Perfect Pitch, Every Time.' Expect nothing less <br /> than
            exceptional turf for every game.
          </p>
          <Link to={"/turfs"}>
            <button className="home-banner-button mt-12">Book a Turf</button>
          </Link>
        </div>
      </div>
      <div
        ref={sectionRef}
        className="featured-turf w-full mx-auto flex flex-col items-center"
      >
        <div className="featured-upper my-10">
          <h2 className="featured-heading">Featured Turfs</h2>
          <h2 className="featured-sub-heading">
            Experience Top-Tier Cricket: Featured Turfs Designed for Optimal
            Gameplay.
          </h2>
        </div>
        <div className="turfs-list w-fullrounded-2xl my-3 mx-20">
          {[1, 2, 3].map((i) => (
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
        <div className="featured-browse-btn mb-8 mt-5 border-1 p-3 rounded-lg">
          <Link to={"/turfs"} className=" py-4">
            <button className="browse-btn">Browse Turfs</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
