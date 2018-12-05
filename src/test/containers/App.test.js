import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App, { Main } from '../../App';

let app;
describe('App Container', () => {
	beforeEach(() => {
		app = shallow(
			<Main>
				<App />
			</Main>
		);
		return app;
	});
	it('renders without crashing', () => {
		expect(app).toMatchSnapshot();
	});

	it('should contain a provider', () => {});
});
