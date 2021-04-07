import React, { useState } from "react";
import "./Shipping.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/action/cartAction";

function Shipping() {
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [name, setName] = useState(shippingInfo.name);
  const [postCode, setPostCode] = useState(shippingInfo.postCode);
  const [country, setCountry] = useState(shippingInfo.country);

  // make sure user is logged in
  const userInfo = useSelector((state) => state.login.user);
  if (!userInfo) {
    history.push("/signin");
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ name, address, city, country, postCode }));
    history.push("/payment");
  };
  return (
    <div className="shipping">
      {/* <CheckoutSteps step1 step2 /> */}
      <form onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <div>
            <label htmlFor="">Full Name</label>
            <br />
            <input
              type="text"
              placeholder="John Doe"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Address</label>
            <br />
            <input
              type="text"
              placeholder="21 Katherine Pl"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">City</label>
            <br />
            <input
              type="text"
              required
              placeholder="Melbourne"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Country</label>
            <br />
            <input
              type="text"
              required
              placeholder="Australia"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label htmlFor="">Postal Code</label>
            <br />
            <input
              type="text"
              required
              placeholder="3000"
              onChange={(e) => setPostCode(e.target.value)}
            />
          </div>
        </div>
        <br />
        {/* {errorMsg ? (
          <div className="danger-bg">
            <p className="col-danger">{errorMsg}</p>
          </div>
        ) : (
          ""
        )} */}
        <div>
          <button type="submit" style={{ marginTop: "1rem" }}>
            Continue
          </button>
        </div>
        {/* <div style={{ marginTop: "1rem" }} className="login-register">
          <p style={{ fontFamily: "Montserrat" }}>
            Have an account?{" "}
            <Link
              to={`/signin?redirect=${redirect}`}
              style={{ textDecoration: "none" }}
            >
              <span>Log In</span>
            </Link>
          </p>
        </div> */}
      </form>
    </div>
  );
}

export default Shipping;
