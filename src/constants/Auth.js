import hello from 'hellojs'
import { history } from '../store'

export default class Auth {
	accessToken

	idToken

	expiresAt

	currentProvider

	/**
	 * Initialize class
	 */
	constructor() {
		this.hello = hello.init({
			google: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			facebook: process.env.REACT_APP_FACEBOOK_APP_ID || ''
		})
	}

	/**
	 * Utility method to login with provider/s
	 * @param {*} provider required
	 * @param {*} cb
	 */
	async loginWith(provider) {
		const options = {
			display: 'popup',
			scope: 'email, profile, openid',
			redirect_uri: '/auth/callback'
		}

		// Logs in with provider, using options above and optional callback provided in args.
		try {
			const { network, authResponse } = await this.hello.login(provider, options)
			const { access_token: accessToken, expires } = authResponse
			this.accessToken = accessToken
			this.expiresAt = expires
			this.currentProvider = network
			return authResponse
		} catch (error) {
			return console.error(error)
		}
	}

	/**
	 * Checks provider for session info (authenticated)
	 */
	getAuthResponse = provider => this.hello.getAuthResponse(provider)

	/**
	 * Get Me (Profile)
	 */
	async getMe(provider) {
		return this.hello(provider).api('me')
	}

	/**
	 * Return access token for current session
	 */
	getAccessToken = () => this.accessToken

	/**
	 * not yet implemented method....
	 * @param {*} authResult
	 */
	// setSession(authResult) {
	// 	// Set isLoggedIn flag in localStorage
	// 	localStorage.setItem('token', authResult.token)

	// 	// Set the time that the access token will expire at
	// 	// let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
	// 	// this.accessToken = authResult.accessToken;
	// 	// this.idToken = authResult.idToken;
	// 	// this.expiresAt = expiresAt;

	// 	// navigate to the home route
	// 	history.replace('/')
	// }

	/**
	 * Stubbed method to renew session...
	 */
	// renewSession() {}

	logout(provider, cb) {
		return this.hello.logout(provider, {}, cb).then(() => {
			this.accessToken = null
			this.idToken = null
			this.expiresAt = 0

			// Remove token from localStorage
			localStorage.removeItem('token')

			// navigate to the home route
			history.replace('/')
		})
		// Remove tokens and expiry time
	}

	isAuthenticated(provider) {
		// Check whether the current time is past the
		// access token's expiry time
		// let expiresAt = this.expiresAt;
		// return new Date().getTime() < expiresAt;
		return this.hello(provider).getAuthResponse()
	}
}
