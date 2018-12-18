export const key = 'settings';

export const SAVE_SETTINGS_COMPLETE = `${key}/SAVE_SETTINGS_COMPLETE`;
export const saveSettingsComplete = settings => ({
	type: SAVE_SETTINGS_COMPLETE,
	settings
});
export const GET_SETTINGS = `${key}/GET_SETTINGS`;
export const getSettings = () => ({
	type: GET_SETTINGS
});
export const GET_SETTINGS_COMPLETE = `${key}/GET_SETTINGS_COMPLETE`;
export const getSettingsComplete = settings => ({
	type: GET_SETTINGS_COMPLETE,
	settings
});

export const actionTypes = {
	GET_SETTINGS,
	GET_SETTINGS_COMPLETE,
	SAVE_SETTINGS_COMPLETE
};

export const actionCreators = { getSettings, saveSettingsComplete };

export const getSettingsAsync = id => async (dispatch, getState) => {
	console.log('Try get user settings');

	try {
		dispatch(getSettings());
		const { user: { settings } } = getState();
		console.log('User settings: ');

		// console.log('UserId: ', id);

		const settingsObj = await settings.db.getSettings(id);
		console.log('User settings: ', settingsObj);

		return dispatch(getSettingsComplete(settingsObj));
		// return;
	} catch (error) {
		console.log(error);

		// return { error, ok: false };
	}
};

export const saveSettingsAsync = settingsObj => async (dispatch, getState) => {
	try {
		const { auth, user: { settings } } = getState();
		const { user: { _id: id } } = auth;
		console.log('User id: ', auth, id);

		const doc = await settings.db.saveSettings(id, settingsObj);
		console.log('Saved: ', doc);
		return dispatch(saveSettingsComplete(doc));
	} catch (error) {
		return { error, ok: false };
	}
};

export const actions = { saveSettingsAsync, getSettingsAsync };
