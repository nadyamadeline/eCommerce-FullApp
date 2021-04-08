import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Payment.scss";
import { savePaymentMethod } from "../../redux/action/cartAction";
import { useHistory } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  if (!shippingInfo.address) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/review");
  };
  return (
    <div className="payment">
      <h1>Payment</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            checked
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="PayPal">Paypal</label>
        </div>
        <div>
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="Stripe">Stripe</label>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Payment;
