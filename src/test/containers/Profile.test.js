import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { connect } from 'react-redux';
import * as shallowWithStore from '../shallowStore';
import { shallow } from 'enzyme';
import * as Profile from '../../components/Profile';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

let Component;
let wrapper;
describe('Profile Component', () => {
	beforeEach(() => {
		Component = compose(withRouter(connect(() => {})(Profile)));
		// wrapper = shallow(<Component />);
	});

	it('renders without crashing', () => {
		const testState = {
			user: {}
		};

		const initialState = {};
		const store = mockStore(testState);
		// Component = compose(Profile);
		const component = shallowWithStore(<Component />, store);
		expect(component).to.be.a('object');
	});

	// it('has propTypes', () => {
	// 	expect(Profile.propTypes).objectContaining({ profile: PropTypes.instanceOf(Object) });
	// });
});
