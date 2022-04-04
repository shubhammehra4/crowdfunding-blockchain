import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1> FundRaising </h1>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>

        <div className="all_btn">
          <button className="view_all_btn" id="view_btn">
            <Link to="/FundList">
              <span style={{ color: "white", fontSize: 17 }}>
                {" "}
                View Opportunities{" "}
              </span>
            </Link>
            <a href="/" class="arr arr-prev">
              {" "}
              {}{" "}
            </a>
          </button>

          <button className="create_btn" id="view_btn">
            <Link to="/Form1">
              <span style={{ color: "white", fontSize: 17 }}>
                {" "}
                Create Campaign{" "}
              </span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
