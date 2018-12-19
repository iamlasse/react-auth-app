import React from 'react';
import { shallow } from 'enzyme';
import shallowWithStore from '../shallowStore';
import configureMockStore from 'redux-mock-store';

import Dashboard from '../../containers/components/app/Dashboard';

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
