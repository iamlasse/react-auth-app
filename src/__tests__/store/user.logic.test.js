import { createMockStore } from 'redux-logic-test';
import { authReducer as reducer, actionTypes, actions as authActions } from '../../store/modules/auth';
import authLogic from '../../store/modules/auth/logic';
import { deps } from './auth.constants';

const logic = authLogic;
let store;

describe('Auth GET_USER Logic', () => {
	it('should handle GET_USER logic', done => {
		store = createMockStore({
			reducer,
			initialState: { authenticated: false, fetching: false, user: null },
			logic,
			injectedDeps: deps
		});
		store.dispatch(authActions.getUser());
		store.whenComplete(() => {
			expect(store.getState()).toEqual({
				authenticated: false,
				error: 'No token, please login',
				fetching: false,
				user: null
			});
			expect(store.actions).toEqual([
				{ type: 'auth/GET_USER' },
				{ error: 'No token, please login', type: 'auth/GET_USER_FAILED' }
			]);
			done();
		});
	});

	it('should handle GET_USER failed logic', done => {
		store = createMockStore({
			reducer,
			initialState: { authenticated: true }, // Hack to fail get user with 1 logic
			logic,
			injectedDeps: deps
		});
		store.dispatch({ type: actionTypes.GET_USER });
		store.whenComplete(() => {
			expect(store.getState()).toEqual({
				authenticated: false,
				fetching: false,
				error: 'No token, please login'
			});
			expect(store.actions).toEqual([
				{ type: actionTypes.GET_USER },
				{
					type: actionTypes.GET_USER_FAILED,
					error: 'No token, please login'
				}
			]);
			done();
		});
	});
});
