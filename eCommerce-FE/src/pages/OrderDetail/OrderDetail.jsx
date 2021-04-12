import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, payOrder } from "../../redux/action/orderAction";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../redux/actionType/orderTypes";
import Moment from "moment";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.detailOrder.detail);
  const orderPay = useSelector((state) => state.payReducer);

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

    if ((orderDetails && !orderDetails._id) || orderPay.success) {
      dispatch({ type: ORDER_PAY_RESET });
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
  }, [dispatch, id, orderDetails, sdkReady, orderPay]);

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails, paymentResult));
  };

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
              <div>
                <p>
                  Delivered at{" "}
                  {orderDetails && orderDetails.deliveredAt
                    ? orderDetails.deliveredAt
                    : ""}
                </p>
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
                    ? Moment(orderDetails.paidAt).format("DD MMM YYYY, hh:mm a")
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
                ? orderDetails.itemsPrice
                : ""}
            </p>
            <p>
              <span>Shipping:</span> $
              {orderDetails && typeof orderDetails.shippingPrice !== undefined
                ? orderDetails.shippingPrice
                : ""}
            </p>
            <p>
              <span>Tax:</span> $
              {orderDetails && orderDetails.taxPrice
                ? orderDetails.taxPrice
                : ""}
            </p>
            <p style={{ fontSize: "20px" }}>
              <span>Total:</span> $
              {orderDetails && orderDetails.totalPrice
                ? orderDetails.totalPrice
                : ""}
            </p>
            {orderDetails && !orderDetails.isPaid && (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;

// || (orderDetails && orderDetails._id) !== id
