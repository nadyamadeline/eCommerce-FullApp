import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderList, deleteOrder } from "../../../redux/action/adminAction";
import { Link } from "react-router-dom";
import Moment from "moment";
import { ORDER_DELETE_RESET } from "../../../redux/actionType/adminTypes";

const OrderList = () => {
  const listOrder = useSelector((state) => state.orderList);
  const orders = listOrder.order;
  const orderDelete = useSelector((state) => state.deleteOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderDelete.success) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(orderList());
  }, [dispatch, orderDelete]);

  const deleteOrderHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(id));
    }
  };
  return (
    <div>
      <div className="order-history">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Orders</h1>
          <Link to={`/admin/products/create`}>
            <button className="createProduct-btn">Create Product</button>
          </Link>
        </div>
        {listOrder.loading ? (
          <p>Loading...</p>
        ) : listOrder.error ? (
          <p>{listOrder.error}</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
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
                      <td>{order.user.name}</td>
                      <td>{Moment(order.createdAt).format("DD/MM/YY")}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <p>
                            Paid at {Moment(order.paidAt).format("DD/MM/YY")}
                          </p>
                        ) : (
                          <p>Not Paid</p>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <p>
                            Delivered at{" "}
                            {Moment(order.deliveredAt).format("DD/MM/YYYY")}
                          </p>
                        ) : (
                          <p>Not Delivered</p>
                        )}
                      </td>
                      <td>
                        <div>
                          <Link to={`/order/${order._id}/edit`}>
                            <button style={{ marginRight: "0.5rem" }}>
                              Edit
                            </button>
                          </Link>

                          <button onClick={() => deleteOrderHandler(order._id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
