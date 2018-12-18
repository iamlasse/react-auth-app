import Api from '../../../constants/Api';

export const key = 'auth';

export const LOGIN_REQUESTED_EMAIL = `${key}/LOGIN_REQUESTED_EMAIL`;
export const LOGIN_REQUESTED_OAUTH = `${key}/LOGIN_REQUESTED_OAUTH`;
export const LOGIN_FAILED = `${key}/LOGIN_FAILED`;
export const LOGIN_SUCCESS = `${key}/LOGIN_SUCCESS`;
export const SIGNUP_REQUESTED = `${key}/SIGNUP_REQUESTED`;
export const SIGNUP_FAILED = `${key}/SIGNUP_FAILED`;
export const SIGNUP_SUCCESS = `${key}/SIGNUP_SUCCESS`;
export const GET_USER = `${key}/GET_USER`;
export const GET_USER_SUCCESS = `${key}/GET_USER_SUCCESS`;
export const GET_USER_FAILED = `${key}/GET_USER_FAILED`;
export const LOGOUT = `${key}/LOGOUT`;
export const LOGOUT_SUCCESS = `${key}/LOGOUT_SUCCESS`;
export const LOGOUT_FAILED = `${key}/LOGOUT_FAILED`;

export const actionTypes = {
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
};

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

export const signupRequest = (username, password) => ({
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

export const getUser = () => ({
	type: GET_USER
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
		await localStorage.clear('token');
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
	signupRequest,
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
