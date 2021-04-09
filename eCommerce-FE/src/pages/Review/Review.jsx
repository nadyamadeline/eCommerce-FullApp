import React, { useEffect } from "react";
import "./Review.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrder } from "../../redux/action/orderAction";
import { CREATE_ORDER_RESET } from "../../redux/actionType/orderTypes";

function Review() {
  // get cart items
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.cartItem;
  const shippingInfo = cart.shippingInfo;
  const paymentMethod = cart.paymentMethod;

  // check if payment method has been selected
  const history = useHistory();
  if (!paymentMethod) {
    history.push("/payment");
  }

  // calculate various prices, rounding to cent
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cartItem.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  // create order
  const dispatch = useDispatch();
  const orderData = {
    orderItems: cartItem,
    shippingInfo: shippingInfo,
    paymentMethod: paymentMethod,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
  };
  const placeOrder = () => {
    dispatch(createOrder(orderData));
  };

  // check if order successfully created
  const orderCreate = useSelector((state) => state.order);
  useEffect(() => {
    if (orderCreate.success) {
      history.push(`/order/${orderCreate.order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [dispatch, history, orderCreate]);
  return (
    <div className="review">
      <div className="order-detail">
        <div className="review-shipping">
          <h2>Shipping</h2>
          <p>
            <span>Name: </span> {shippingInfo.name}
          </p>
          <p>
            <span>Address: </span>
            {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country},{" "}
            {shippingInfo.postCode}
          </p>
        </div>
        <div className="review-payment">
          <h2>Payment</h2>
          <p>
            <span>Method: </span> {paymentMethod}
          </p>
        </div>
        <div className="review-items">
          <h2>Items</h2>
          <div className="review-item-header">
            <p style={{ width: "42%" }}>Item</p>
            <p style={{ width: "25%" }}>Quantity</p>
            <p style={{ width: "20%" }}>Price</p>
            <p>Subtotal</p>
          </div>
          {cartItem.map((item, index) => (
            <div key={index} style={{ margin: 0 }} className="review-item">
              <div style={{ width: "42%" }} className="review-img-name">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100px" }}
                />
                <p>{item.name}</p>
              </div>
              <p style={{ width: "25%" }}>{item.qty}</p>
              <p style={{ width: "20%" }}>${item.price}</p>
              <p>${item.qty * item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="order-summary">
        <div className="summary-detail">
          <h2>Purchase Summary</h2>
          <p>
            <span>Items:</span> ${cart.itemsPrice.toFixed(2)}
          </p>
          <p>
            <span>Shipping:</span> ${cart.shippingPrice.toFixed(2)}
          </p>
          <p>
            <span>Tax:</span> ${cart.taxPrice.toFixed(2)}
          </p>
          <p style={{ fontSize: "20px" }}>
            <span>Total:</span> ${cart.totalPrice.toFixed(2)}
          </p>
          <button onClick={placeOrder} disabled={cartItem.length === 0}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
