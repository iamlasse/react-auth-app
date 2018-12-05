import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import { Dashboard } from '../../components/Dashboard';

let Component;
let wrapper;
describe('Register Component', () => {
	beforeEach(() => {
		Component = compose(withRouter(connect(() => {})(Dashboard)));
		wrapper = shallow(<Component />);
	});

	it('renders without crashing', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
