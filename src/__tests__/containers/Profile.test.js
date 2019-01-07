import React from 'react';
import configureMockStore from 'redux-mock-store';
import shallowWithStore from '../../shallowStore';
import Profile from '../../containers/user/Profile';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('Profile Redux', () => {
	beforeEach(() => { });

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
