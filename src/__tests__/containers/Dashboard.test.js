import React from 'react';
import configureMockStore from 'redux-mock-store';
import shallowWithStore from '../../shallowStore';
import Dashboard from '../../containers/app/Dashboard';

const middlewares = [];
const mockStore = configureMockStore(middlewares);
describe('Register Component', () => {
	beforeEach(() => { });

	it('renders without crashing', () => {
		const testState = {
			user: {}
		};
		const store = mockStore(testState);
		const component = shallowWithStore(Dashboard, store);
		expect(component).toMatchSnapshot();
	});
});
