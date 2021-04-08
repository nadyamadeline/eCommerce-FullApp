import React, { useEffect } from "react";
import "./Review.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrder } from "../../redux/action/orderAction";
import { CREATE_ORDER_RESET } from "../../redux/actionType/orderTypes";

function Review() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const cartItem = cart.cartItem;
  const shippingInfo = cart.shippingInfo;
  const paymentMethod = cart.paymentMethod;

  const history = useHistory();
  if (!paymentMethod) {
    history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.order);
  console.log(orderCreate);

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cartItem.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

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

  console.log("order reducer", orderCreate);

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
          <p>Name: {shippingInfo.name}</p>
          <p>
            Address: {shippingInfo.address}, {shippingInfo.city},{" "}
            {shippingInfo.country}, {shippingInfo.postCode}
          </p>
        </div>
        <div className="review-payment">
          <h2>Payment</h2>
          <p>Method: {paymentMethod}</p>
        </div>
        <div className="review-items">
          <h2>Items</h2>
          {cartItem.map((item, index) => (
            <div key={index} style={{ margin: 0 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px" }}
              />
              <p>{item.name}</p>
              <p>{item.qty}</p>
              <p>${item.price}</p>
              <p>${item.qty * item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="order-summary">
        <div className="summary-detail">
          <h2>Summary</h2>
          <p>Items: ${cart.itemsPrice.toFixed(2)}</p>
          <p>Shipping: ${cart.shippingPrice.toFixed(2)}</p>
          <p>Tax: ${cart.taxPrice.toFixed(2)}</p>
          <p>Total: ${cart.totalPrice.toFixed(2)}</p>
          <button onClick={placeOrder} disabled={cartItem.length === 0}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
