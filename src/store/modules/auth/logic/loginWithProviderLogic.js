import { createLogic } from 'redux-logic'
import Cookies from 'js-cookie'
import { push } from 'connected-react-router'
import { actionTypes, actions } from '../index'
import AppToaster from '../../../../constants/AppToaster'

const { LOGIN_REQUESTED_OAUTH } = actionTypes
const { loginSuccess, loginFailed } = actions

export default createLogic({
	type: LOGIN_REQUESTED_OAUTH,
	latest: true,
	warnTimeout: 0,
	async process({ httpClient, action }, dispatch, done) {
		function onError(message) {
			dispatch(loginFailed(message))
			AppToaster.show({ message, intent: 'danger' })
		}
		function onSuccess(user) {
			Cookies.set('token', user.token)
			dispatch(loginSuccess(user))
			dispatch(push('/dashboard'))
		}
		try {
			const { provider, accessToken } = action
			const {
				data: { user }
			} = await httpClient.post(`/auth/${provider}`, {
				access_token: accessToken,
				provider
			})
			AppToaster.show({
				message: `Logged in with ${provider}`,
				intent: 'success'
			})
			return done(onSuccess(user))
		} catch (error) {
			return done(onError(error.message))
		}
	}
})
