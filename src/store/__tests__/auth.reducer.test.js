import { authReducer as reducer, actionTypes, actions as authActions } from '../modules/auth';
import { createMockStore } from 'redux-logic-test';
import { user, initialState } from './auth.constants';

describe('Auth Reducer', () => {
	/** 
   * Initial Auth State
   */
	it('should return the initial Auth state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	/**
   * Get User
   */
	it('should handle GET_USER', () => {
		expect(reducer({}, authActions.getUser())).toEqual({ fetching: true });
	});
	/**
   *  Get User success
   */
	it('should handle GET_USER_SUCCESS', () => {
		expect(reducer({}, authActions.getUserSuccess(user, true))).toEqual({
			authenticated: true,
			fetching: false,
			user
		});
	});

	/**
   * Get user failed
   */
	it('should handle GET_USER_FAILED', () => {
		expect(reducer({}, authActions.getUserFailed('Failed to get user'))).toEqual({
			authenticated: false,
			fetching: false,
			error: 'Failed to get user'
		});
	});

	it('should handle LOGIN_REQUESTED', () => {
		expect(reducer({}, authActions.loginRequest(user.email, 'password'))).toEqual({
			fetching: true
		});
	});

	it('should  handle LOGIN_FAILED', () => {
		expect(reducer({}, authActions.loginFailed('Failed to log in'))).toEqual({
			error: 'Failed to log in',
			authenticated: false,
			fetching: false
		});
	});

	it('should handle LOGIN_SUCCESS', () => {
		expect(reducer({}, authActions.loginSuccess(user))).toEqual({
			fetching: false,
			user,
			authenticated: true
		});
	});

	it('should handle LOGOUT', () => {
		expect(reducer({}, authActions.logoutRequest())).toEqual({ fetching: true });
	});

	it('should handle LOGOUT_SUCESS', () => {
		expect(reducer({}, authActions.logoutSuccess())).toEqual({
			authenticated: false,
			fetching: false
		});
	});

	it('should handle LOGOUT_FAILED', () => {
		expect(reducer({}, authActions.logoutFailed())).toEqual({ fetching: false });
	});
});
