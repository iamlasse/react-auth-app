import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../containers/components/auth/Register';

let Component;
let wrapper;
describe('Register Component', () => {
	beforeEach(() => {
		wrapper = shallow(<Register />);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
