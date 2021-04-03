import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <div className="logo">
          <p>canopy &amp; co.</p>
        </div>
      </Link>
      <div className="nav-tabs">
        <p>Shop</p>
        <p>About</p>
        <p>Featured</p>
        <p>New</p>
      </div>
      <div className="menu">
        <p>Cart</p>
        <p>Log In</p>
      </div>
    </div>
  );
}

export default Navbar;
