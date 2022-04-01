import React from 'react'
import '../styles/navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <div className='navbar'>
            <div className='leftside'>
                <Link to="/"> Fund Raising </Link>
            </div>
            <div className='right'>
                <ul className='rightside'>
                    <li><Link to="/" activeClass="active" style={{ fontSize: 16 }}> Funds </Link></li>
                    <li><Link to="/" activeClass="active" style={{ fontSize: 16 }}> My Investments </Link></li>
                    <li><Link to="/" activeClass="active" style={{ fontSize: 16 }}> Pending Decisions </Link></li>
                </ul>
                <button onClick={connect} id="btn"> Connect Wallet </button>
            </div>
        </div>
    )
}

export default Navbar
