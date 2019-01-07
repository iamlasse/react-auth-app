import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../../containers/auth/components/Signup';

let wrapper;
describe('Register Component', () => {
	beforeEach(() => {
		wrapper = shallow(<Signup />);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
