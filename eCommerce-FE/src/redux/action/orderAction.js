import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../actionType/orderTypes";
import { CART_EMPTY } from "../actionType/cartTypes";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
    payload: order,
  });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });
    dispatch({
      type: CART_EMPTY,
    });
    localStorage.removeItem("cartItem");
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAIL_REQUEST,
    payload: id,
  });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ORDER_PAY_REQUEST,
    payload: { order, paymentResult },
  });
  try {
    const {
      login: { user },
    } = getState();

    const { data } = await axios.put(
      `/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
