import axios from "axios";
import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
} from "../actionType/productDetailTypes";

export const productDetail = (id) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAIL_REQUEST,
    payload: id,
  });
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createReview = (id, body) => async (dispatch, getState) => {
  dispatch({
    type: REVIEW_CREATE_REQUEST,
  });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.post(`/api/products/${id}/review`, body, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
