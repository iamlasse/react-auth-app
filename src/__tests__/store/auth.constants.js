import mockAxios from 'jest-mock-axios';

export const deps = {
	httpClient: mockAxios
};

export const user = {
	email: 'test@test.com'
};

export const initialState = {
	authenticated: false,
	fetching: false
};

it('should ', () => {});
