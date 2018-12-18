import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history as reduxHistory } from './store';
import './index.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const target = document.getElementById('root');

serviceWorker.register({
	onUpdate: registration => {
		console.log(registration);
	},
	onSuccess: registration => {
		console.log(registration);
	}
});

const renderHMR = Component => {
	return render(
		<Provider store={store}>
			<ConnectedRouter history={reduxHistory}>
				<Component />
			</ConnectedRouter>
		</Provider>,
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
