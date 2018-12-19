// unique key namespace used by combineReducers.
// By convention it will match the directory structure to
// make it easy to locate the src.
// Also action types will prefix with the capitalized version
export const key = 'users'

// action type constants
export const USERS_FETCH = `${key}/USERS_FETCH`
export const USERS_FETCH_CANCEL = `${key}/USERS_FETCH_CANCEL`
export const USERS_FETCH_FULFILLED = `${key}/USERS_FETCH_FULFILLED`
export const USERS_FETCH_REJECTED = `${key}/USERS_FETCH_REJECTED`
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
export const GET_USERS = 'GET_USERS'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILED = 'GET_USERS_FAILED'

export const actionTypes = {
	GET_USERS,
	GET_USERS_SUCCESS,
	GET_USERS_FAILED,
	USERS_FETCH,
	USERS_FETCH_CANCEL,
	USERS_FETCH_FULFILLED,
	USERS_FETCH_REJECTED,
	LOGOUT_SUCCESS
}

// action creators
export const getUsersRequest = () => ({
	type: GET_USERS
})

export const getUsersSuccess = users => ({
	type: GET_USERS_SUCCESS,
	users
})
export const getUsersFailed = error => ({
	type: GET_USERS_FAILED,
	error
})
export const usersFetch = () => ({ type: USERS_FETCH })
export const usersFetchCancel = () => ({ type: USERS_FETCH_CANCEL })
export const usersFetchFulfilled = users => ({
	type: USERS_FETCH_FULFILLED,
	users
})
export const usersFetchRejected = err => ({
	type: USERS_FETCH_REJECTED,
	payload: err,
	error: true
})

export const actions = {
	getUsersRequest,
	getUsersSuccess,
	getUsersFailed,
	usersFetch,
	usersFetchCancel,
	usersFetchFulfilled,
	usersFetchRejected
}
