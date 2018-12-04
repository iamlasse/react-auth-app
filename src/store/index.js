import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogicMiddleware } from 'redux-logic';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import rootReducer from './modules';
import logic from './modules/rootLogic';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';

const baseURL = 'http://localhost:3001/';

const httpClient = axios.create({
	baseURL
});

const deps = {
	httpClient
};

const logicMiddleWare = createLogicMiddleware(logic, deps);

export const history = createBrowserHistory();
const middleware = [ logicMiddleWare, thunk, routerMiddleware(history) ];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

	if (typeof devToolsExtension === 'function') {
		// enhancers.push(
		// 	devToolsExtension({
		// 		latency: 0
		// 	})
		// );
	}
}
const composeWith = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const composedEnhancers = composeWith(applyMiddleware(...middleware), ...enhancers);

export default createStore(connectRouter(history)(rootReducer), {}, composedEnhancers);
