import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cart = useSelector((state) => state.cart.cartItem);

  let totalItem = 0;
  cart.map((x) => (totalItem += Number(x.qty)));
  // console.log(totalItem);

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
        <p>
          Cart{" "}
          <span style={{ color: "white", backgroundColor: "red" }}>
            {totalItem}
          </span>
        </p>
        <p>Log In</p>
      </div>
    </div>
  );
}

export default Navbar;
