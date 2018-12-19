import {
	LOGIN_REQUESTED_EMAIL,
	LOGIN_REQUESTED_OAUTH,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	SIGNUP_REQUESTED,
	SIGNUP_FAILED,
	SIGNUP_SUCCESS,
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED,
	LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from './actionTypes'

const initialState = {
	authenticated: false,
	fetching: false
}

const getAuthUser = state => state.auth.user
const getAuthenticated = state => state.auth.authenticated
const getAuthFetchStatus = state => state.fetching

export const selectors = {
	getAuthUser,
	getAuthFetchStatus,
	getAuthenticated
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUESTED_EMAIL:
		case LOGIN_REQUESTED_OAUTH:
			return {
				...state,
				fetching: true
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				authenticated: true,
				fetching: false,
				user: action.user
			}
		case LOGIN_FAILED:
			return {
				...state,
				error: action.error,
				fetching: false,
				authenticated: false
			}
		case SIGNUP_REQUESTED:
			return {
				...state,
				fetching: true
			}
		case SIGNUP_SUCCESS:
			return {
				...state,
				fetching: false
			}
		case SIGNUP_FAILED:
			return {
				...state,
				error: action.error,
				fetching: false,
				authenticated: false
			}
		case GET_USER:
			return {
				...state,
				fetching: true
			}
		case GET_USER_SUCCESS:
			return {
				...state,
				authenticated: action.authenticated,
				fetching: false,
				user: action.user
			}
		case GET_USER_FAILED:
			return {
				...state,
				authenticated: false,
				fetching: false,
				error: action.error
			}
		case LOGOUT:
			return {
				...state,
				fetching: true
			}
		case LOGOUT_FAILED:
			return {
				...state,
				fetching: false,
				error: action.error
			}
		case LOGOUT_SUCCESS:
			return {
				fetching: false,
				authenticated: false
			}
		default:
			return state
	}
}

export default reducer
