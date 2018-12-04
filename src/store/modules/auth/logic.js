import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import { AppToaster } from '../../../constants/AppToaster';
import {
	GET_USER,
	LOGIN_REQUESTED,
	getUserSuccess,
	getUserFailed,
	loginSuccess,
	loginFailed,
	loginRequest
} from './actions';

export const loginLogic = createLogic({
	type: LOGIN_REQUESTED,
	latest: true,
	async process({ httpClient, action }, dispatch, done) {
		console.log(action);

		const { username, password } = action;
		function onError(error) {
			dispatch(loginFailed(error));
			AppToaster.show({ message: error, intent: 'danger' });
			return error;
		}
		function onSuccess(user, token) {
			dispatch(loginSuccess(user));
			dispatch(push('/dashboard'));
			AppToaster.show({ message: 'Logged in.', intent: 'success' });
			return {
				user,
				token
			};
		}
		try {
			// dispatch(loginRequest());
			const { data: { user, token }, error } = await httpClient.post('/auth/login', {
				email: username,
				password
			});
			if (!user || !token) throw new Error(error);

			localStorage.setItem('token', token);
			return onSuccess(user, token);
		} catch (error) {
			return onError(error.message);
		}
		done();
	}
});

export const getUserLogic = createLogic({
	type: GET_USER,
	latest: true,
	async process({ httpClient }, dispatch, done) {
		console.log('Dispatch logic Authenticate user');
		try {
			const token = await localStorage.getItem('token');
			console.log('Token: ', token);
			if (!token) throw new Error('No token, please login');

			const { data: { user, authenticated }, error } = await httpClient.get('auth/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!user || !authenticated) throw new Error(error);
			dispatch(getUserSuccess(user, authenticated));
			dispatch(push('/dashboard'));
			AppToaster.show({ message: `Welcome back ${user.username}`, intent: 'success' });
			done();
		} catch (error) {
			dispatch(getUserFailed(error.message));
			AppToaster.show({ message: `Please Login`, intent: 'primary' });
			done();
		}
	}
});

export default [ getUserLogic, loginLogic ];
