import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
} from "../actionType/loginTypes";

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
  dispatch({
    type: USER_SIGNOUT,
  });
};
