import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "./auth";
import { usersReducer } from "./users";
import { notesReducer } from "./notes";
import { settingsReducer } from "./user";

export default combineReducers({
  form: formReducer,
  notes: notesReducer,
  users: usersReducer,
  auth: authReducer,
  user: combineReducers({ settings: settingsReducer })
});
