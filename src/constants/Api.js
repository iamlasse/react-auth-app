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
	static async login(username, password) {
		try {
			console.log('Login in api');
			const { data: { user, token }, error } = await axios.post(`${baseUrl}/login`, {
				email: username,
				password
			});
			if (error) throw new Error(error);
			localStorage.setItem('token', token);
			// return { user };
			return { user, token };
		} catch (error) {
			return { error };
		}
	}
}
