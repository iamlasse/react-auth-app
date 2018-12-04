import React from 'react';
import { render } from 'react-dom';
import './index.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import App, { Main } from './App';
import * as serviceWorker from './serviceWorker';

const target = document.getElementById('root');

serviceWorker.register({
	onUpdate: (registration) => {
		console.log(registration);
	},
	onSuccess: (registration) => {
		console.log(registration);
	}
});

const renderHMR = (Component) => {
	return render(
		<Main>
			<Component />
		</Main>,
		target
	);
};

renderHMR(App);

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default;
		renderHMR(NextApp);
	});
}
