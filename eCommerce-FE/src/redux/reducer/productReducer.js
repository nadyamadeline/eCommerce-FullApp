import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../actionType/productListTypes";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: "",
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialState2 = {
  loading: false,
  category: [],
  error: "",
};

const productCategoryReducer = (state = initialState2, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload,
        error: "",
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { productReducer, productCategoryReducer };
