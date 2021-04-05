import {
  USER_LOGIN_REQUEST,
  USER_SIGNOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../actionType/loginTypes";

const initialState = {
  loading: false,
  user: localStorage.getItem("userToken")
    ? JSON.parse(localStorage.getItem("userToken"))
    : [],
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
        user: [],
        error: action.payload,
      };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
export default loginReducer;
