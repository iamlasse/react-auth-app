import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import Login from '../../containers/components/auth/Login';

let Component;
let wrapper;
describe('Login Component', () => {
	beforeEach(() => {
		wrapper = shallow(<Login />);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
