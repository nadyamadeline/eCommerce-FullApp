import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../redux/action/orderAction";
import { Link } from "react-router-dom";
import Moment from "moment";
import "./OrderHistory.scss";

const OrderHistory = () => {
  const orderList = useSelector((state) => state.userOrders);
  const loading = orderList.loading;
  const error = orderList.error;
  const orders = orderList.orders;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <div className="order-history">
      <h1>My Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        { error }
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Purchase Date</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={`/order/${order._id}`}
                        style={{
                          fontWeight: 600,
                          color: "#4c4036",
                        }}
                      >
                        {order._id}
                      </Link>
                    </td>
                    <td>{Moment(order.createdAt).format("DD/MM/YY")}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        <p>Paid at {Moment(order.paidAt).format("DD/MM/YY")}</p>
                      ) : (
                        <p>Not Paid</p>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <p>
                          Delivered at{" "}
                          {Moment(order.deliveredAt).format("DD MM YYYY")}
                        </p>
                      ) : (
                        <p>Not Delivered</p>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button>Detail</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
