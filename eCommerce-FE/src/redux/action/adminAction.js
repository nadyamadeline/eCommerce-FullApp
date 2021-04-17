import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "../actionType/adminTypes";
import axios from "axios";

export const createProduct = (body) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
  });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.post(`/api/products`, body, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (id, body) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: body });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.put(`/api/products/${id}`, body, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
