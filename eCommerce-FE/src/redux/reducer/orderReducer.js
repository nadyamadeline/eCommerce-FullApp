import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  USER_ORDER_REQUEST,
  USER_ORDER_SUCCESS,
  USER_ORDER_FAIL,
} from "../actionType/orderTypes";

const initialState = {
  loading: false,
  success: false,
  order: {},
  error: "",
};

export const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

const initialState2 = {
  loading: false,
  detail: {},
  error: "",
};

export const orderDetailReducer = (state = initialState2, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        detail: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialState3 = {};
export const orderPayReducer = (state = initialState3, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DETAIL_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

const initialState4 = {
  loading: false,
  orders: [],
  error: "",
};
export const userOrdersReducer = (state = initialState4, action) => {
  switch (action.type) {
    case USER_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case USER_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
