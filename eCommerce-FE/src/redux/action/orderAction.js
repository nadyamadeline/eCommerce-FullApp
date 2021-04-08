import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
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
