import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import configureMockStore from 'redux-mock-store';
import { connect } from 'react-redux';
import shallowWithStore from '../shallowStore';
import { shallow } from 'enzyme';
import Profile from '../../containers/user/Profile';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

let Component;
let wrapper;
describe('Profile Redux', () => {
	beforeEach(() => {});

	it('renders without crashing', () => {
		const testState = {
			user: {}
		};

		const store = mockStore(testState);
		// Component = compose(Profile);
		const component = shallowWithStore(Profile, store);
		expect(component).toBeInstanceOf(Object);

		// expect(component).to.be.a('object');
	});

	// it('has propTypes', () => {
	// 	expect(Profile.propTypes).objectContaining({ profile: PropTypes.instanceOf(Object) });
	// });
});
