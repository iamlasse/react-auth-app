import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import shallowWithStore from '../shallowStore';
import configureMockStore from 'redux-mock-store';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import Dashboard from '../../containers/app/Dashboard';

const middlewares = [];
const mockStore = configureMockStore(middlewares);
describe('Register Component', () => {
	beforeEach(() => {});

	it('renders without crashing', () => {
		const testState = {
			user: {}
		};
		const store = mockStore(testState);
		const component = shallowWithStore(Dashboard, store);
		expect(component).toMatchSnapshot();
	});
});
