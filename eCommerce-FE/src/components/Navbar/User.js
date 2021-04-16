import React from "react";
import { useSelector, useDispatch } from "react-redux";
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
            <Link to={`/user/profile`} style={{ textDecoration: "none" }}>
              <p>Profile</p>
            </Link>
            <Link to={`/user/orders`} style={{ textDecoration: "none" }}>
              <p>Orders</p>
            </Link>
            <p onClick={handleSignOut}>Log Out</p>
          </div>
        </li>
      </div>
    </div>
  );
}

export default User;
