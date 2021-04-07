import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionType/loginTypes";

const initialState = {
  loading: false,
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  error: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export { loginReducer, registerReducer };
