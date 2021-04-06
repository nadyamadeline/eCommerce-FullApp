import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Hero.scss";
import { signOut } from "../../redux/action/loginAction";

function Hero() {
  const userInfo = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div>
      <div className="hero-logged-in">
        <li className="hero-dropdown">
          <div className="hero-profile-container">
            <h2 className="hero-dropbtn">
              {userInfo.isAdmin ? <p>Admin</p> : <p>{userInfo.name}</p>}
            </h2>
          </div>
          <div className="hero-dropdown-content">
            {/* {!userInfo.isAdmin ? (
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <p>{userInfo.name}</p>
              </Link>
            ) : userInfo.isAdmin ? (
              <Link to="/admin/overview" style={{ textDecoration: "none" }}>
                <p>Admin</p>
              </Link>
            ) : null} */}

            <p>Setting</p>

            <p onClick={handleSignOut}>Log Out</p>
          </div>
        </li>
      </div>
    </div>
  );
}

export default Hero;
