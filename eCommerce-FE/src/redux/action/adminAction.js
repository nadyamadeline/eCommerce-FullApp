import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
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
