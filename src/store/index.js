import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogicMiddleware } from 'redux-logic';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import rootReducer from './modules';
import logic from './modules/rootLogic';

const baseURL = 'http://localhost:3001/';

const httpClient = axios.create({
	baseURL
});

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
