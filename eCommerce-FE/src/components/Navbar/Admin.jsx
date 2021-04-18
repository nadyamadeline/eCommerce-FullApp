import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./User.scss";
import { signOut } from "../../redux/action/userAction";
import { useHistory, Link } from "react-router-dom";

function User() {
  const userInfo = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignOut = () => {
    dispatch(signOut());
    history.push("/");
  };
  return (
    <div>
      <div className="hero-logged-in">
        <li className="hero-dropdown">
          <div className="hero-profile-container">
            <h2 className="hero-dropbtn">
              <p>{userInfo.name}</p>
            </h2>
          </div>
          <div className="hero-dropdown-content">
            <Link to={`/admin/profile`} style={{ textDecoration: "none" }}>
              <p>Profile</p>
            </Link>
            <Link to={`/admin/dashboard`} style={{ textDecoration: "none" }}>
              <p>Dashboard</p>
            </Link>
            <Link to={`/admin/productList`} style={{ textDecoration: "none" }}>
              <p>Products</p>
            </Link>
            <Link to={`/admin/orderList`} style={{ textDecoration: "none" }}>
              <p>Orders</p>
            </Link>
            <Link to={`/admin/userList`} style={{ textDecoration: "none" }}>
              <p>Users</p>
            </Link>
            <p onClick={handleSignOut}>Log Out</p>
          </div>
        </li>
      </div>
    </div>
  );
}

export default User;
