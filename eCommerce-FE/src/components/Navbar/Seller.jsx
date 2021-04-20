import React from "react";
import { useSelector } from "react-redux";
import "./User.scss";
// import { signOut } from "../../redux/action/userAction";
import { Link } from "react-router-dom";

function Seller() {
  const userInfo = useSelector((state) => state.login.user);
  //   const dispatch = useDispatch();
  //   const history = useHistory();
  //   const handleSignOut = () => {
  //     dispatch(signOut());
  //     history.push("/");
  //   };
  return (
    <div>
      <div className="hero-logged-in">
        <li className="hero-dropdown">
          <div className="hero-profile-container">
            <h2 className="hero-dropbtn">
              <p>My Shop</p>
            </h2>
          </div>
          <div className="hero-dropdown-content">
            <Link
              to={`/seller/profile/${userInfo._id}`}
              style={{ textDecoration: "none" }}
            >
              <p>Shop</p>
            </Link>
            <Link to={`/seller/products`} style={{ textDecoration: "none" }}>
              <p>Products</p>
            </Link>
            <Link to={`/seller/orders`} style={{ textDecoration: "none" }}>
              <p>Orders</p>
            </Link>

            {/* <p onClick={handleSignOut}>Log Out</p> */}
          </div>
        </li>
      </div>
    </div>
  );
}

export default Seller;
