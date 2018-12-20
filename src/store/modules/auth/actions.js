import Api from "../../../constants/Api";
import {
  LOGIN_REQUESTED_EMAIL,
  LOGIN_REQUESTED_OAUTH,
  SIGNUP_REQUESTED,
  LOGIN_FAILED,
  SIGNUP_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "./actionTypes";

export const loginRequestEmail = (username, password) => ({
  type: LOGIN_REQUESTED_EMAIL,
  username,
  password
});

export const loginRequestProvider = (provider, accessToken) => ({
  type: LOGIN_REQUESTED_OAUTH,
  provider,
  accessToken
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  error
});

export const signupRequestEmail = (username, password) => ({
  type: SIGNUP_REQUESTED,
  username,
  password
});

export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  user
});

export const signupFailed = error => ({
  type: SIGNUP_FAILED,
  error
});

export const getUser = options => ({
  type: GET_USER,
  options
});

export const getUserSuccess = (user, authenticated) => ({
  type: GET_USER_SUCCESS,
  user,
  authenticated
});

export const getUserFailed = error => ({
  type: GET_USER_FAILED,
  error
});

export const logoutRequest = () => ({
  type: LOGOUT
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailed = error => ({
  type: LOGOUT_FAILED,
  error
});

export const logout = () => async dispatch => {
  try {
    dispatch(logoutRequest());
    await Api.logout();
    await localStorage.clear("token");
    return dispatch(logoutSuccess());
  } catch (error) {
    return dispatch(logoutFailed(error.message));
  }
};

export const actions = {
  loginRequestEmail,
  loginRequestProvider,
  loginFailed,
  loginSuccess,
  signupRequestEmail,
  signupFailed,
  signupSuccess,
  getUser,
  getUserSuccess,
  getUserFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  logout
};
