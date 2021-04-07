import React from "react";
import "./CheckoutSteps.scss";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <div className="checkout-steps">
      <div className={step1 ? "co-active" : ""}>Log In</div>
      <div className={step2 ? "co-active" : ""}>Shipping</div>
      <div className={step3 ? "co-active" : ""}>Payment</div>
      <div className={step4 ? "co-active" : ""}>Place Order</div>
    </div>
  );
}

export default CheckoutSteps;
