import { SAVE_SETTINGS_COMPLETE, GET_SETTINGS, GET_SETTINGS_COMPLETE } from './actions';

import DB from './db';

const db = new DB('user');
// db.destroy();

const initialState = {
	db,
	theme: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SETTINGS_COMPLETE:
			return {
				...state,
				theme: action.settings.theme,
				lastLogin: action.settings.lastLogin
			};
		case GET_SETTINGS:
			return { ...state };
		case GET_SETTINGS_COMPLETE:
			return { ...state, ...action.settings };
		default:
			return state;
	}
};

export default reducer;
