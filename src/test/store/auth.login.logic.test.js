import { reducer, actionTypes, actions as authActions } from '../../store/modules/auth';
import { createMockStore } from 'redux-logic-test';
import authLogic from './auth.logic';
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

		store.dispatch(authActions.loginRequest('test@test.com', 'password'));
		store.whenComplete(() => {
			expect(store.getState()).toEqual({ authenticated: true, fetching: false, user });
			expect(store.actions).toEqual([
				{ type: 'auth/LOGIN_REQUESTED', username: user.email, password: 'password' },
				{ type: 'auth/LOGIN_SUCCESS', user }
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

		store.dispatch(authActions.loginRequest('test@test.com', 'password'));
		store.whenComplete(() => {
			expect(store.getState()).toEqual({ authenticated: false, fetching: false, error: 'Error logging in' });
			expect(store.actions).toEqual([
				{ type: 'auth/LOGIN_REQUESTED', username: user.email, password: 'password' },
				{ type: 'auth/LOGIN_FAILED', error: 'Error logging in' }
			]);
		});
	});
});
