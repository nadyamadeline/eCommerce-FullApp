import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../actionType/userTypes";

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
  localStorage.removeItem("shippingInfo");
  dispatch({
    type: USER_SIGNOUT,
  });
};

export const userDetail = (id) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAIL_REQUEST,
    payload: id,
  });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUserProfile = (updateUser) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: updateUser,
  });
  try {
    const {
      login: { user },
    } = getState();
    const { data } = await axios.put(`/api/users/profile`, updateUser, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
