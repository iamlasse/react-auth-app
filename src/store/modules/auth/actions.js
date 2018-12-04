import axios from 'axios';
import { AppToaster } from '../../../constants/AppToaster';
import Api from '../../../constants/Api';
import { push } from 'react-router-redux';

export const key = 'auth/';
export const LOGIN_REQUESTED = `${key}LOGIN_REQUESTED`;
export const LOGIN_FAILED = `${key}LOGIN_FAILED`;
export const LOGIN_SUCCESS = `${key}LOGIN_SUCCESS`;
export const GET_USER = `${key}GET_USER`;
export const GET_USER_SUCCESS = `${key}GET_USER_SUCCESS`;
export const GET_USER_FAILED = `${key}GET_USER_FAILED`;
export const LOGOUT = `${key}LOGOUT`;
export const LOGOUT_SUCCESS = `${key}LOGOUT_SUCCESS`;
export const LOGOUT_FAILED = `${key}LOGOUT_FAILED`;
export const actionTypes = {
	LOGIN_REQUESTED,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
};

export const loginRequest = (username, password) => ({
	type: LOGIN_REQUESTED,
	username,
	password
});

export const loginSuccess = (user) => ({
	type: LOGIN_SUCCESS,
	user
});

export const loginFailed = (error) => ({
	type: LOGIN_FAILED,
	error
});

export const getUser = () => ({
	type: GET_USER
});

export const getUserSuccess = (user, authenticated) => ({
	type: GET_USER_SUCCESS,
	user,
	authenticated
});

export const getUserFailed = (error) => ({
	type: GET_USER_FAILED,
	error
});

export const logoutRequest = () => ({
	type: LOGOUT
});

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS
});

export const logoutFailed = () => ({
	type: LOGOUT_FAILED
});

export const logout = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(logoutRequest());
			await Api.logout();
			await localStorage.clear('token');
			dispatch(logoutSuccess());
		} catch (error) {}
	};
};

export const actions = {
	loginRequest,
	loginFailed,
	loginSuccess,
	getUser,
	getUserSuccess,
	getUserFailed,
	logoutRequest,
	logoutSuccess,
	logoutFailed,
	logout
};
