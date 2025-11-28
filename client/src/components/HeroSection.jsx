import React from 'react'
import HeroImage from "../images/hero.jpg"
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <>
      <div className="hero-section">
        <div className="left">
          <div className="overlay"></div> {/* Add overlay here */}
          <div className="left-content">
            <p>Eat Well, Live Better Today</p>
            <h1>BRINGING FRESHNESS</h1>
            <h1>TO YOUR</h1>
            <h1>HOME</h1>
            <button>
              <Link to={"/menu"} style={{ textDecoration: "none", color: "white" }}>
                Order Now!
              </Link>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default HeroSection
