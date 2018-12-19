import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/auth/'

export default class Api {
	static async logout() {
		try {
			return await axios.get(`${baseUrl}/signout`)
		} catch (error) {
			return { error }
		}
	}
}
