import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../actionType/productDetailTypes";

const initialState = {
  loading: false,
  product: {},
  error: "",
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: "",
      };
    case PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        product: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productDetailReducer;
