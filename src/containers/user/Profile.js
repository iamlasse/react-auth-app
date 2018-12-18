import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from '../components/user/Profile';
import { authSel } from '../../store/modules/auth';
import { actions as userActions } from '../../store/modules/user';
import { noteSel, actions as notesActions } from '../../store/modules/notes';
import requireAuth from '../requireAuth';

const { getAuthUser } = authSel;
const { getNotes, getNote } = noteSel;

const mapStateToProps = state => ({
	db: state.notes.db,
	profile: getAuthUser(state),
	notes: getNotes(state),
	fetching: state.notes.fetching,
	selectedNote: getNote(state.notes, state.notes.selected),
	theme: state.user.settings.theme
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			getNotesAsync: notesActions.getNotesAsync,
			selectNote: notesActions.selectNote,
			saveSettingsAsync: userActions.saveSettingsAsync
		},
		dispatch
	)
});

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Profile));
