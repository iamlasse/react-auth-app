import { createLogic } from 'redux-logic'
import { push } from 'connected-react-router'
import Cookies from 'js-cookie'
import { actionTypes, actions } from '../index'
import AppToaster from '../../../../constants/AppToaster'

const { SIGNUP_REQUESTED } = actionTypes
const { signupFailed, signupSuccess } = actions

export default createLogic({
	type: SIGNUP_REQUESTED,
	latest: true,
	warnTimeout: 0,
	async process({ httpClient, action }, dispatch, done) {
		// console.log('Call signup redux logic: ', action)
		const { username, password, email } = action
		function onError(message) {
			dispatch(signupFailed(message))
			AppToaster.show({ message, intent: 'danger' })
		}
		function onSuccess(token, user) {
			Cookies.set('token', token)
			dispatch(signupSuccess(user))
			AppToaster.show({ message: 'Signed up, now login', intent: 'success' })
			dispatch(push('/signin'))
		}
		try {
			const { token, user } = await httpClient
				.post('/auth/signup', {
					username,
					email,
					password
				})
				.then(response => response.data)
			return done(onSuccess(token, user))
		} catch (error) {
			// console.log('Got back from api: ', error)
			return done(onError(error.message))
		}
	}
})
