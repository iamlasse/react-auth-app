import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogicMiddleware } from 'redux-logic';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import rootReducer from './modules';
import logic from './modules/rootLogic';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3001/api';

const getAuthToken = () => {
	const token = localStorage.getItem('token');

	if (token) return `Bearer ${token}`;
	return false;
};

const httpClient = axios.create({
	baseURL
});

httpClient.defaults.headers.common['Authorization'] = getAuthToken();

httpClient.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		console.log('Intercepted request: ', config);

		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

const deps = {
	httpClient
};

const logicMiddleWare = createLogicMiddleware(logic, deps);

export const history = createBrowserHistory();
const middleware = [
	logicMiddleWare,
	thunk,
	routerMiddleware(history)
];

const enhancers = [];

const composeWith = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const composedEnhancers = composeWith(applyMiddleware(...middleware), ...enhancers);

export default createStore(connectRouter(history)(rootReducer), {}, composedEnhancers);
