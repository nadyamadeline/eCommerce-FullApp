import { CART_ADD_ITEM, CARD_DELETE_ITEM } from "../actionType/cartTypes";
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
    type: CARD_DELETE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
