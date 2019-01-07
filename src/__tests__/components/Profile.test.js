import React from 'react';
import configureMockStore from 'redux-mock-store';
import shallowWithStore from '../../shallowStore';
import Profile from '../../containers/user/Profile';

let wrapper;
const middlewares = [];
const mockStore = configureMockStore(middlewares);
describe('Profile Component', () => {
	beforeEach(() => {
		const testState = { user: {} };
		const store = mockStore(testState);
		wrapper = shallowWithStore(Profile, store);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});

	// it('has propTypes', () => {
	// 	expect(Profile.propTypes).objectContaining({ profile: PropTypes.instanceOf(Object) });
	// });
});
