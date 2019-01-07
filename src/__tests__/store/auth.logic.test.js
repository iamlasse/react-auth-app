import { createMockStore } from 'redux-logic-test';
import { authReducer as reducer, actionTypes, actions as authActions } from '../../store/modules/auth';
import authLogic from '../../store/modules/auth/logic';
import { deps, user, initialState } from './auth.constants';

const logic = authLogic;
let store;

describe('Auth LOGIN logic', () => {
	it('should handle LOGIN success logic', () => {
		store = createMockStore({
			injectedDeps: deps,
			logic,
			reducer,
			initialState
		});

		store.dispatch(authActions.loginRequestEmail('test@test.com', 'password'));
		store.whenComplete(() => {
			expect(store.getState()).toEqual({ authenticated: true, fetching: false, user });
			expect(store.actions).toEqual([
				{
					type: actionTypes.LOGIN_REQUESTED_EMAIL, username: user.email, password: 'password'
				},
				{ type: actionTypes.LOGIN_SUCCESS, user }
			]);
		});
	});

	it('should handle LOGIN failed logic', () => {
		store = createMockStore({
			injectedDeps: deps,
			logic,
			reducer,
			initialState: { authenticated: true, fetching: false } // Hack to fake failing login
		});

		store.dispatch(authActions.loginRequestEmail('test@test.com', 'password'));
		store.whenComplete(() => {
			expect(store.getState()).toEqual({
				authenticated: false,
				fetching: false,
				error: 'Error logging in'
			});
			expect(store.actions).toEqual([
				{ type: actionTypes.LOGIN_REQUESTED_EMAIL, username: user.email, password: 'password' },
				{ type: actionTypes.LOGIN_FAILED, error: 'Error logging in' }
			]);
		});
	});
});
