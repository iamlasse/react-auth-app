import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const shallowWithStore = (component, store) => {
	const context = {
		store
	};
	return shallow(<component />, { context });
};

export default shallowWithStore;
