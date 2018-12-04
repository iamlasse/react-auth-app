import { reducer, actionTypes, actions as authActions } from '../../store/modules/auth';
import { createMockStore } from 'redux-logic-test';
import authLogic from './auth.logic';
import { deps, user, initialState } from './auth.constants';
const logic = authLogic;
let store;

describe('Auth GET_USER Logic', () => {
	it('should handle GET_USER logic', (done) => {
		store = createMockStore({
			reducer,
			initialState: { authenticated: false, fetching: false, user: null },
			logic,
			injectedDeps: deps
		});
		store.dispatch(authActions.getUser());
		store.whenComplete(() => {
			expect(store.getState()).toEqual({
				authenticated: true,
				fetching: false,
				user
			});
			expect(store.actions).toEqual([
				{ type: 'auth/GET_USER' },
				{
					type: 'auth/GET_USER_SUCCESS',
					user,
					authenticated: true
				}
			]);
			done();
		});
	});

	it('should handle GET_USER failed logic', (done) => {
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
				error: 'Failed to get user'
			});
			expect(store.actions).toEqual([
				{ type: actionTypes.GET_USER },
				{
					type: actionTypes.GET_USER_FAILED,
					error: 'Failed to get user'
				}
			]);
			done();
		});
	});
});
