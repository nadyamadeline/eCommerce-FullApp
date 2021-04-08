import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../actionType/loginTypes";

export const register = (body) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: body,
  });
  try {
    const { data } = await axios.post("/api/users/register", body);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const login = (body) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
    payload: body,
  });
  try {
    const { data } = await axios.post("/api/users/login", body);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItem");
  localStorage.removeItem("ShippingInfo");
  dispatch({
    type: USER_SIGNOUT,
  });
};
