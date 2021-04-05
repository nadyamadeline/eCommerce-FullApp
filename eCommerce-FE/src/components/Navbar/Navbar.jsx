import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/action/loginAction";

function Navbar() {
  const cart = useSelector((state) => state.cart.cartItem);
  const userInfo = useSelector((state) => state.login.user);

  let totalItem = 0;
  cart.map((x) => (totalItem += Number(x.qty)));
  // console.log(totalItem);

  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
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
        <Link to="/cart">
          <p>
            Cart{" "}
            <span style={{ color: "white", backgroundColor: "red" }}>
              {totalItem}
            </span>
          </p>
        </Link>
        {userInfo ? (
          <div>
            <Link to="#">
              <p>{userInfo.name} v</p>
            </Link>
            <ul>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </ul>
          </div>
        ) : (
          <Link to="/signin">
            <p>Log In</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
