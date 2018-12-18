import axios from 'axios';

const baseUrl = 'http://localhost:3001/auth/';

export default class Api {
	static async logout() {
		try {
			return await axios.get(`${baseUrl}/logout`);
		} catch (error) {
			return { error };
		}
	}
}
