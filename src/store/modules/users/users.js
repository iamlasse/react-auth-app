import {
	USERS_FETCH_FULFILLED,
	USERS_FETCH,
	LOGOUT_SUCCESS,
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_FAILED
} from './actions';

const key = 'users';

const getUsers = state => state[key].list;
const getFetchStatus = state => state[key].fetching;

export const selectors = {
	getUsers,
	getFetchStatus
};

const initialState = {
	fetching: false,
	list: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, fetching: true };
		case GET_USERS_SUCCESS:
			return { ...state, fetching: false, users: action.users };
		case GET_USERS_FAILED:
			return { ...state, fetching: false, error: action.error };
		case USERS_FETCH:
			return { ...state, fetching: true };
		case USERS_FETCH_FULFILLED:
			return { ...state, list: action.users, fetching: false };
		case LOGOUT_SUCCESS:
			return initialState;
		default:
			return state;
	}
};

export default reducer;
