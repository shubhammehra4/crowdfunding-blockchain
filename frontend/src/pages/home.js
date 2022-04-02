import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> FundRaising </h1>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        <a href="#home" style={{ textDecoration: "none" }}>
          <button className="primary-button" id="view_btn">
            <Link to="/">
              <span style={{ color: "white", fontSize: 17 }}>
                {" "}
                View Opportunities{" "}
              </span>
            </Link>
            <a href="#" class="arr arr-prev"></a>
          </button>
          <button className="primary-button" id="view_btn">
            <Link to="/Form1">
              <span style={{ color: "white", fontSize: 17 }}>
                {" "}
                Create Campaign{" "}
              </span>
            </Link>
          </button>
        </a>
      </div>
    </div>
  );
}

export default Home;
