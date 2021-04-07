import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  SAVE_SHIPPING_INFO,
  SAVE_PAYMENT_METHOD,
} from "../actionType/cartTypes";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_DELETE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
