import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import User from "./User";
import Admin from "./Admin";

function Navbar() {
  const cart = useSelector((state) => state.cart.cartItem);
  const userInfo = useSelector((state) => state.login.user);
  let totalItem = cart.reduce((a, c) => a + Number(c.qty), 0);

  // scroll effect
  const [scroll, setScroll] = useState(false);
  const changeBackground = () => {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <div className={scroll ? "navbar-scroll" : "navbar"}>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <div className="logo">
          <p>canopy &amp; co.</p>
        </div>
      </Link>
      {/* <div className="nav-tabs">
        <h2>Shop</h2>
        <h2>About</h2>
        <h2>Featured</h2>
        <h2>New</h2>
      </div> */}
      <div className="menu">
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <h2 className="nav-cart">
            Cart <span>{totalItem}</span>
          </h2>
        </Link>

        {userInfo ? (
          <div style={{ display: "flex" }}>
            {!userInfo.isAdmin ? <User /> : ""}
            {userInfo.isAdmin ? <Admin /> : ""}
          </div>
        ) : (
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <h2 className="nav-login">Log In</h2>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
