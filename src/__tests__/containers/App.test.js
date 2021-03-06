import React from 'react';
import configureMockStore from 'redux-mock-store';
import shallowWithStore from '../../shallowStore';
import App from '../../App';

let wrapper;
const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('App Container', () => {
	beforeEach(() => {
		const store = mockStore({ user: {} });
		wrapper = shallowWithStore(App, store);
	});
	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should contain a provider', () => { });
});
