import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../actionType/productListTypes";
import axios from "axios";

export const productLists = ({ seller = "", name = "" }) => async (
  dispatch
) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `/api/products?seller=${seller}&name=${name}`
    );
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.message,
    });
  }
};
