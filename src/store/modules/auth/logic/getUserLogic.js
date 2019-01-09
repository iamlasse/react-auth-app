import { createLogic } from 'redux-logic'
import { push } from 'connected-react-router'
import Cookies from 'js-cookie'
import { actionTypes, actions } from '../index'
import AppToaster from '../../../../constants/AppToaster'

const { GET_USER } = actionTypes
const { getUserSuccess, getUserFailed } = actions

export default createLogic({
	type: GET_USER,
	latest: true,
	async process({ httpClient, action }, dispatch, done) {
		// console.log('Dispatch logic Authenticate user')
		try {
			const { redirectTo } = action.options || '/dashboard'
			const token = await Cookies.get('token')
			if (!token) throw new Error('No token, please login')
			const {
				data: { user, authenticated },
				error
			} = await httpClient.get('auth/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			if (!user || !authenticated) throw new Error(error)
			dispatch(getUserSuccess(user, authenticated))
			if (redirectTo) {
				dispatch(push(redirectTo))
			} else {
				dispatch(push('/dashboard'))
			}
			AppToaster.show({
				message: `Welcome back ${user.username}`,
				intent: 'success'
			})
			done()
		} catch (error) {
			dispatch(getUserFailed(error.message))
			done()
		}
	}
})
