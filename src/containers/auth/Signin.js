import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { actions as authActions, authSel } from '../../store/modules/auth';
import Signin from './components/Signin';

const { getAuthenticated, getAuthFetchStatus } = authSel;

const mapStateToProps = state => ({
	fetching: getAuthFetchStatus(state),
	authenticated: getAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			login: authActions.loginRequestEmail,
			loginWith: authActions.loginRequestProvider
		},
		dispatch
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
