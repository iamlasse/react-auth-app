import axios from 'axios';
import Api from '../Api';

jest.mock('axios');
describe('Api', () => {
	it('should call logout', async () => {
		const resp = {};
		axios.get.mockResolvedValue(resp);

		const response = await Api.logout();
		expect(response).toEqual(resp);
	});
});
