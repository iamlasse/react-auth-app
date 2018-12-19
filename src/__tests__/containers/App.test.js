import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import shallowWithStore from '../shallowStore';
import configureMockStore from 'redux-mock-store';
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

	it('should contain a provider', () => {});
});
