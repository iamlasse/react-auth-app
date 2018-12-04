// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'users';

// action type constants
export const USERS_FETCH = `${key}/USERS_FETCH`;
export const USERS_FETCH_CANCEL = `${key}/USERS_FETCH_CANCEL`;
export const USERS_FETCH_FULFILLED = `${key}/USERS_FETCH_FULFILLED`;
export const USERS_FETCH_REJECTED = `${key}/USERS_FETCH_REJECTED`;
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

export const actionTypes = {
	USERS_FETCH,
	USERS_FETCH_CANCEL,
	USERS_FETCH_FULFILLED,
	USERS_FETCH_REJECTED,
	LOGOUT_SUCCESS
};

// action creators
export const usersFetch = () => ({ type: USERS_FETCH });
export const usersFetchCancel = () => ({ type: USERS_FETCH_CANCEL });
export const usersFetchFulfilled = (users) => ({
	type: USERS_FETCH_FULFILLED,
	users
});
export const usersFetchRejected = (err) => ({
	type: USERS_FETCH_REJECTED,
	payload: err,
	error: true
});

export const actions = {
	usersFetch,
	usersFetchCancel,
	usersFetchFulfilled,
	usersFetchRejected
};
