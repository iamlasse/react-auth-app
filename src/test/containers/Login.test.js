import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { Login } from '../../components/Login';

let Component;
let wrapper;
describe('Dashboard Component', () => {
	beforeEach(() => {
		Component = compose(withRouter(connect(() => {})(Login)));
		wrapper = shallow(<Component />);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
