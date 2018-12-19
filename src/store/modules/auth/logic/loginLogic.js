import { createLogic } from 'redux-logic'
import { push } from 'connected-react-router'
import { actionTypes, actions } from '../index'
import AppToaster from '../../../../constants/AppToaster'

const { LOGIN_REQUESTED_EMAIL } = actionTypes
const { loginSuccess, loginFailed } = actions

export default createLogic({
	type: LOGIN_REQUESTED_EMAIL,
	latest: true,
	warnTimeout: 0,
	async process({ httpClient, action }, dispatch, done) {
		const { username, password } = action
		function onError(message) {
			dispatch(loginFailed(message))
			AppToaster.show({ message, intent: 'danger' })
		}
		function onSuccess(user, token) {
			dispatch(loginSuccess(user, token))
			dispatch(push('/dashboard'))
			AppToaster.show({ message: 'Logged in.', intent: 'success' })
		}
		try {
			const {
				data: { user, token }
			} = await httpClient.post('/auth/signin', {
				email: username,
				password
			})
			if (!user || !token) throw new Error('User not found...')
			localStorage.setItem('token', token)
			return done(onSuccess(user, token))
		} catch (error) {
			return done(onError(error.message))
		}
	}
})
