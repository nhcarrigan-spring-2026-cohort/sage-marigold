import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <h1><Link to="/">Sage Marigold</Link></h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Donate">Donate</Link></li>
            <li><Link to="/Explore">Explore</Link></li>
            <li><Link to="/Login">Login</Link></li>
        </ul>
    </nav>
  );
};

export default memo(Navbar);