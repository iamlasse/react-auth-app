import React from 'react';
import configureMockStore from 'redux-mock-store';
import shallowWithStore from '../../shallowStore';

import Dashboard from '../../containers/app/Dashboard';

let wrapper;
const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('Register Component', () => {
	beforeEach(() => {
		const store = mockStore({ user: {} });
		wrapper = shallowWithStore(Dashboard, store);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
