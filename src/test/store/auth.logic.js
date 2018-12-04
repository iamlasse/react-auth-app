import { reducer, actionTypes, actions as authActions } from '../../store/modules/auth';
import { createLogic } from 'redux-logic';
const user = {
	email: 'test@test.com'
};
const getUserLogic = createLogic({
	type: actionTypes.GET_USER,
	latest: true,
	async process({ httpClient, getState }, dispatch, done) {
		try {
			const { authenticated } = getState();
			const payload = {
				authenticated: !authenticated,
				user
			};

			if (!payload.authenticated) throw new Error('Failed to get user');

			dispatch(authActions.getUserSuccess(payload.user, payload.authenticated));
			done();
		} catch (error) {
			dispatch(authActions.getUserFailed(error.message));
			done();
		}
	}
});

const loginLogic = createLogic({
	type: actionTypes.LOGIN_REQUESTED,
	latest: true,
	async process({ httpClient, getState }, dispatch, done) {
		try {
			const { authenticated } = getState();
			const payload = {
				authenticated: !authenticated,
				user
			};
			const token = 'sdcsdcsdcsdcsdcsdcsdcsdcsdcsdcscdsdcsdcsdcs';
			if (!payload.authenticated) throw new Error('Error logging in');
			dispatch(authActions.loginSuccess(user));
		} catch (error) {
			dispatch(authActions.loginFailed(error.message));
			done();
		}
		done();
	}
});

export default [ getUserLogic, loginLogic ];
