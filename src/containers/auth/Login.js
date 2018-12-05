import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions as authActions, authSel } from '../../store/modules/auth';
import Login from '../components/auth/Login';

const { getAuthenticated, getAuthFetchStatus } = authSel;

const mapStateToProps = state => ({
	fetching: getAuthFetchStatus(state),
	authenticated: getAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			login: authActions.loginRequest
		},
		dispatch
	)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
