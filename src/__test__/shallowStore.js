import React from 'react';
import { shallow } from 'enzyme';

const shallowWithStore = (component, store) => {
	const context = {
		store
	};
	return shallow(<component />, { context });
};

export default shallowWithStore;
