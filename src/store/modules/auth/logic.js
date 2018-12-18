import { createLogic } from 'redux-logic';
import { push, replace } from 'connected-react-router';

import { AppToaster } from '../../../constants/AppToaster';
import { actionTypes, actions } from './actions';

const { GET_USER, LOGIN_REQUESTED_EMAIL, LOGIN_REQUESTED_OAUTH, SIGNUP_REQUESTED } = actionTypes;
const {
	getUserSuccess,
	getUserFailed,
	loginSuccess,
	loginFailed,
	signupFailed,
	signupSuccess
} = actions;

export const loginLogic = createLogic({
	type: LOGIN_REQUESTED_EMAIL,
	latest: true,
	warnTimeout: 0,
	async process({ httpClient, action }, dispatch, done) {
		const { username, password } = action;
		function onError(message) {
			dispatch(loginFailed(message));
			AppToaster.show({ message, intent: 'danger' });
		}

		function onSuccess(user, token) {
			dispatch(loginSuccess(user, token));
			dispatch(push('/dashboard'));
			AppToaster.show({ message: 'Logged in.', intent: 'success' });
		}

		try {
			const { data: { user, token } } = await httpClient.post('/auth/signin', {
				email: username,
				password
			});

			if (!user || !token) throw new Error('User not found...');

			localStorage.setItem('token', token);

			return done(onSuccess(user, token));
		} catch (error) {
			return done(onError(error.message));
		}
	}
});

export const loginWithProviderLogic = createLogic({
	type: LOGIN_REQUESTED_OAUTH,
	latest: true,
	warnTimeout: 0,
	async process({ httpClient, action }, dispatch, done) {
		function onError(message) {
			dispatch(loginFailed(message));
			AppToaster.show({ message, intent: 'danger' });
		}

		function onSuccess(user) {
			localStorage.setItem('token', user.token);
			dispatch(loginSuccess(user));
			dispatch(push('/dashboard'));
			AppToaster.show({ message: 'Logged in with Google.', intent: 'success' });
		}

		try {
			const { provider, accessToken: access_token } = action;
			const { data: { user } } = await httpClient.post(`/auth/${provider}`, {
				access_token,
				provider
			});

			console.log('Received payload:', user);
			return done(onSuccess(user));
		} catch (error) {
			return done(onError(error.message));
		}
	}
});

export const signupLogic = createLogic({
	type: SIGNUP_REQUESTED,
	latest: true,
	warnTimeout: 0,
	async process({ httpClient, action, getState }, dispatch, done) {
		console.log('Call signup redux logic: ', action);
		const { history } = getState().router;
		const { username, password } = action;
		function onError(message) {
			dispatch(signupFailed(message));
			AppToaster.show({ message, intent: 'danger' });
		}

		function onSuccess(token, user) {
			localStorage.setItem('token', token);
			dispatch(signupSuccess(user));
			AppToaster.show({ message: 'Signed up, now login', intent: 'success' });
			dispatch(push('/signin'));
		}

		try {
			const { token, user } = await httpClient
				.post('/auth/signup', {
					username,
					email: username,
					password
				})
				.then(response => response.data);

			console.log('Received token: ', token);

			return done(onSuccess(token, user));
		} catch (error) {
			console.log('Got back from api: ', error);
			return done(onError(error.message));
		}
	}
});

export const getUserLogic = createLogic({
	type: GET_USER,
	latest: true,
	async process({ httpClient, getState }, dispatch, done) {
		console.log('Dispatch logic Authenticate user');
		try {
			const token = await localStorage.getItem('token');
			// console.log('Token: ', token);

			if (!token) throw new Error('No token, please login');

			const { data: { user, authenticated }, error } = await httpClient.get('auth/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const { router } = getState();
			if (!user || !authenticated) throw new Error(error);
			dispatch(getUserSuccess(user, authenticated));
			console.log(router.location.pathname);

			dispatch(push('/dashboard'));
			AppToaster.show({ message: `Welcome back ${user.username}`, intent: 'success' });
			done();
		} catch (error) {
			dispatch(getUserFailed(error.message));

			// AppToaster.show({ message: `Please Login`, intent: 'primary' });

			done();
		}
	}
});

export default [
	getUserLogic,
	loginLogic,
	loginWithProviderLogic,
	signupLogic
];
