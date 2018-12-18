import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Signup from '../components/auth/Signup';
import { authSel, actions } from '../../store/modules/auth';

const { getAuthFetchStatus, getAuthenticated } = authSel;

const mapStateToProps = state => ({
	fetching: getAuthFetchStatus(state),
	authenticated: getAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			signupUser: actions.signupRequest,
			loginWith: actions.loginRequestProvider
		},
		dispatch
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
