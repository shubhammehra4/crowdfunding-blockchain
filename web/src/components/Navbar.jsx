import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  // const [isConnected, setIsConnected] = useState(false);

  // const onLogin = () => {
  //   setIsConnected(true);
  // };

  // const onLogout = () => {
  //   setIsConnected(false);
  // };

  // const detectProvider = () => {
  //   let provider;
  //   if (window.ethereum) {
  //     provider = window.ethereum;
  //   } else if (window.web3) {
  //     provider = window.web3.currentProvider;
  //   } else {
  //     window.alert("No Ethereum browser detected!");
  //   }
  //   return provider;
  // };

  // const onLoginHandler = async () => {
  //   const provider = detectProvider();
  //   if (provider) {
  //     if (provider !== window.ethereum) {
  //       console.error("Not window.ethereum provider.");
  //     }
  //     await provider.request({
  //       method: "eth_requestAccounts",
  //     });
  //     onLogin();
  //   }
  // };
  const [defaultAccount, setDefaultAccount] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({method: "eth_requestAccounts"})
      .then(result => {
        accountChangedHandler(result[0]);
      })
    } else {
      setErrorMessage("Install MetaMask");
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  }

  const getUserBalance = (address) => {
    window.ethereum.request({method: "eth_getBalance", params: [address, 'latest']})
    .then(balance => {
      getUserBalance(balance);
    })
  }
  
  return (
    <div className="navbar">
      <div className="leftside">
        <Link to="/"> Fund Raising </Link>
      </div>
      <div className="right">
        <ul className="rightside">
          <li>
            <Link to="/FundList" activeClass="active" style={{ fontSize: 16 }}>
              Funds
            </Link>
          </li>
          <li>
            <Link to="/" activeClass="active" style={{ fontSize: 16 }}>
              My Investments
            </Link>
          </li>
          <li>
            <Link to="/" activeClass="active" style={{ fontSize: 16 }}>
              Pending Decisions
            </Link>
          </li>
        </ul>
        {defaultAccount ? 
          <div>
            <h3> Welcome {defaultAccount} </h3>
          </div> : 
          <button onClick={connectWalletHandler} id="btn">
          Connect Wallet
          </button> 
        }
      </div>
    </div>
  );
}

export default Navbar;
