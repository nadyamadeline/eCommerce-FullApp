import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, payOrder } from "../../redux/action/orderAction";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../redux/actionType/orderTypes";
import Moment from "moment";
import { deliverOrder } from "../../redux/action/adminAction";
import { ORDER_DELIVER_RESET } from "../../redux/actionType/adminTypes";
import "./OrderDetail.scss";
import { createReview } from "../../redux/action/productDetailAction";
import { REVIEW_CREATE_RESET } from "../../redux/actionType/productDetailTypes";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.detailOrder.detail);
  const orderPay = useSelector((state) => state.payReducer);
  const user = useSelector((state) => state.login.user);
  const orderDeliver = useSelector((state) => state.deliverOrder);

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      orderPay.success ||
      orderDeliver.success ||
      (orderDetails && orderDetails._id !== id)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetail(id));
    } else {
      if (orderDetails && !orderDetails.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, id, orderDetails, sdkReady, orderPay, orderDeliver]);

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails, paymentResult));
  };

  const deliverOrderHandler = (id) => {
    dispatch(deliverOrder(id));
  };

  // rate order
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const createReviews = useSelector((state) => state.createReview);
  const submitReview = (e) => {
    e.preventDefault();
    if (rating && review) {
      const body = { rating: rating, review: review, name: user.name };
      dispatch(createReview(id, body));
    }
  };

  useEffect(() => {
    if (createReviews.success) {
      window.alert("Review submitted!");
      dispatch({ type: REVIEW_CREATE_RESET });
    }
  }, [createReviews.success, dispatch]);

  return (
    <div className="review-container">
      <div>
        <h2>Thank you for your order!</h2>
        <h3>
          <span>Order</span> #
          {orderDetails && orderDetails._id ? orderDetails._id : ""}
        </h3>
      </div>
      <div className="review">
        <div className="order-detail">
          <div className="review-shipping">
            <h2>Shipping</h2>
            <p>
              <span>Name: </span>
              {orderDetails && orderDetails.shippingInfo
                ? orderDetails.shippingInfo.name
                : ""}
            </p>
            <p>
              <span>Address: </span>{" "}
              {orderDetails && orderDetails.shippingInfo
                ? orderDetails.shippingInfo.address
                : ""}
              ,{" "}
              {orderDetails && orderDetails.shippingInfo
                ? orderDetails.shippingInfo.city
                : ""}
              ,{" "}
              {orderDetails && orderDetails.shippingInfo
                ? orderDetails.shippingInfo.country
                : ""}
              ,{" "}
              {orderDetails && orderDetails.shippingInfo
                ? orderDetails.shippingInfo.postCode
                : ""}
            </p>
            {orderDetails && orderDetails.isDelivered ? (
              <div className="success-bg">
                <h4 className="col-success">
                  Delivered at{" "}
                  {orderDetails && orderDetails.deliveredAt
                    ? Moment(orderDetails.deliveredAt).format(
                        "DD MMMM YYYY, hh:mm a"
                      )
                    : ""}
                </h4>
              </div>
            ) : (
              <div className="danger-bg">
                <h4 className="col-danger">Not delivered</h4>
              </div>
            )}
          </div>
          <div className="review-payment">
            <h2>Payment</h2>
            <p>
              <span>Method: </span>{" "}
              {orderDetails && orderDetails.paymentMethod
                ? orderDetails.paymentMethod
                : ""}
            </p>
            {orderDetails && orderDetails.isPaid ? (
              <div className="success-bg">
                <h4 className="col-success">
                  Paid at{" "}
                  {orderDetails && orderDetails.paidAt
                    ? Moment(orderDetails.paidAt).format(
                        "DD MMMM YYYY, hh:mm a"
                      )
                    : ""}
                </h4>
              </div>
            ) : (
              <div className="danger-bg">
                <h4 className="col-danger">Not paid</h4>
              </div>
            )}
          </div>
          <div className="review-items">
            <h2>Items</h2>
            <div className="review-item-header">
              <p style={{ width: "42%" }}>Item</p>
              <p style={{ width: "25%" }}>Quantity</p>
              <p style={{ width: "20%" }}>Price</p>
              <p>Subtotal</p>
            </div>
            {orderDetails && orderDetails.orderItems
              ? orderDetails.orderItems.map((item, index) => (
                  <div
                    key={index}
                    style={{ margin: 0 }}
                    className="review-item"
                  >
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
                ))
              : ""}
          </div>
        </div>
        <div className="order-summary">
          <div className="summary-detail">
            <h2>Purchase Summary</h2>
            <p>
              <span>Items:</span> $
              {orderDetails && orderDetails.itemsPrice
                ? orderDetails.itemsPrice?.toFixed(2)
                : ""}
            </p>
            <p>
              <span>Shipping:</span> $
              {orderDetails && typeof orderDetails.shippingPrice !== undefined
                ? orderDetails.shippingPrice?.toFixed(2)
                : ""}
            </p>
            <p>
              <span>Tax:</span> $
              {orderDetails && orderDetails.taxPrice
                ? orderDetails.taxPrice?.toFixed(2)
                : ""}
            </p>
            <p style={{ fontSize: "20px" }}>
              <span>Total:</span> $
              {orderDetails && orderDetails.totalPrice
                ? orderDetails.totalPrice?.toFixed(2)
                : ""}
            </p>
            {!user.isAdmin &&
              user._id !== orderDetails?.seller &&
              orderDetails &&
              !orderDetails.isPaid && (
                <div>
                  {!sdkReady ? (
                    <p>Loading...</p>
                  ) : (
                    <PayPalButton
                      amount={
                        orderDetails && orderDetails.totalPrice
                          ? orderDetails.totalPrice
                          : 0
                      }
                      onSuccess={paymentSuccessHandler}
                    />
                  )}
                </div>
              )}
            {user.isAdmin &&
              orderDetails?.isPaid &&
              !orderDetails?.isDelivered && (
                <div>
                  <button onClick={() => deliverOrderHandler(orderDetails._id)}>
                    Deliver Order
                  </button>
                </div>
              )}
          </div>
          <br />
          {orderDetails?.isDelivered ? (
            <div className="rateOrder">
              <h2>Rate Your Order!</h2>
              <form action="" onSubmit={submitReview}>
                <div>
                  <select
                    name=""
                    id=""
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select...
                    </option>
                    <option value="">5 - Excellent</option>
                    <option value="">4 - Very Good</option>
                    <option value="">3 - Good</option>
                    <option value="">2 - Fair</option>
                    <option value="">1 - Poor</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>
                <button>Submit</button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
