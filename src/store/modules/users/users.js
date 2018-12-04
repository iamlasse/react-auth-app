import { AppToaster } from '../../../constants/AppToaster';
import axios from 'axios';
import { USERS_FETCH_FULFILLED, USERS_FETCH, LOGOUT_SUCCESS } from './actions';
const key = 'users';

export const selectors = {
	users: (state) => state[key].list,
	fetching: (state) => state[key].fetching
};

export const GET_USERS = 'GET_USERS';
export const getUsersRequest = () => ({
	type: GET_USERS
});

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const getUsersSuccess = (users) => ({
	type: GET_USERS_SUCCESS,
	users
});
export const GET_USERS_FAILED = 'GET_USERS_FAILED';
export const getUsersFailed = (error) => ({
	type: GET_USERS_FAILED,
	error
});

const initialState = {
	fetching: false,
	users: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, fetching: true };
			break;
		case GET_USERS_SUCCESS:
			return { ...state, fetching: false, users: action.users };
			break;
		case GET_USERS_FAILED:
			return { ...state, fetching: false, error: action.error };
			break;
		case USERS_FETCH:
			return { ...state, fetching: true };
		case USERS_FETCH_FULFILLED:
			return { ...state, users: action.users, fetching: false };
		case LOGOUT_SUCCESS:
			return initialState;
		default:
			return state;
	}
};
export default reducer;
