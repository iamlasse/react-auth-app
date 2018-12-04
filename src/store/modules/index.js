import { combineReducers } from 'redux';
import auth from './auth/auth';
import users from './users/users';

export default combineReducers({
	user: users,
	auth
});
