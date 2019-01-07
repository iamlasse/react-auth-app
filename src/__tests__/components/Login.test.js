import React from 'react';
import { shallow } from 'enzyme';
import Signin from '../../containers/auth/components/Signin';

let wrapper;
describe('Login Component', () => {
	beforeEach(() => {
		wrapper = shallow(<Signin />);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
