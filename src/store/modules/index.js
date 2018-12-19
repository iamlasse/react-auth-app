import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { usersReducer } from './users'
import { notesReducer } from './notes'
import { settingsReducer } from './user'

export default combineReducers({
	notes: notesReducer,
	users: usersReducer,
	auth: authReducer,
	user: combineReducers({ settings: settingsReducer })
})
