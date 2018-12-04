import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { actions as authActions, actionTypes } from '../../store/modules/auth';
import { user, initialState } from './auth.constants';

const logout = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(authActions.logoutRequest());
			// await Api.logout();
			await localStorage.clear('token');
			dispatch(authActions.logoutSuccess());
		} catch (error) {}
	};
};

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Auth Module', () => {
	afterEach(() => {});

	it('should create GET_USER action', () => {
		const expectedAction = authActions.getUser();

		expect(authActions.getUser()).toEqual(expectedAction);
	});

	it('should create GET_USER_FAILED action', () => {
		const expectedAction = authActions.getUserFailed('Failed to get user');

		expect(authActions.getUserFailed('Failed to get user')).toEqual(expectedAction);
	});

	it('should create GET_USER_SUCCESS action', () => {
		const expectedAction = authActions.getUserSuccess(user, true);

		expect(authActions.getUserSuccess(user, true)).toEqual(expectedAction);
	});

	it('should create LOGIN_REQUESTED action', () => {
		const expectedAction = authActions.loginRequest(user.email, 'password');

		expect(authActions.loginRequest(user.email, 'password')).toEqual(expectedAction);
	});

	it('should create LOGIN_FAILED action', () => {
		const expectedAction = authActions.loginFailed('Error logging in');

		expect(authActions.loginFailed('Error logging in')).toEqual(expectedAction);
	});

	it('should create LOGIN_SUCCESS action', () => {
		const expectedAction = authActions.loginSuccess(user, true);

		expect(authActions.loginSuccess(user, true)).toEqual(expectedAction);
	});

	it('should create LOGOUT action', async () => {
		const expectedAction = authActions.logoutRequest();

		expect(authActions.logoutRequest()).toEqual(expectedAction);
	});

	it('should create LOGOUT_SUCCESS action', async () => {
		const expectedAction = authActions.logoutSuccess();

		expect(authActions.logoutSuccess()).toEqual(expectedAction);
	});

	it('should LOGOUT user', async () => {
		const store = mockStore(initialState);
		const expectedActions = [ authActions.logoutRequest(), authActions.logoutSuccess() ];
		await store.dispatch(logout());
		expect(store.getActions()).toEqual(expectedActions);
	});
});
