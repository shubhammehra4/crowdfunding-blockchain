import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const onLogin = () => {
    setIsConnected(true);
  };

  const onLogout = () => {
    setIsConnected(false);
  };

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected!");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error("Not window.ethereum provider.");
      }
      await provider.request({
        method: "eth_requestAccounts",
      });
      onLogin();
    }
  };

  return (
    <div className="navbar">
      <div className="leftside">
        <Link to="/"> Fund Raising </Link>
      </div>
      <div className="right">
        <ul className="rightside">
          <li>
            <Link to="/CardList" activeClass="active" style={{ fontSize: 16 }}>
              {" "}
              Funds{" "}
            </Link>
          </li>
          <li>
            <Link to="/" activeClass="active" style={{ fontSize: 16 }}>
              {" "}
              My Investments{" "}
            </Link>
          </li>
          <li>
            <Link to="/" activeClass="active" style={{ fontSize: 16 }}>
              {" "}
              Pending Decisions{" "}
            </Link>
          </li>
        </ul>
        <button onClick={onLoginHandler} id="btn">
          {" "}
          Connect Wallet{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
