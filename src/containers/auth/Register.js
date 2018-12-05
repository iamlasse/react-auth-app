import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Register from '../components/auth/Register';
import { authSel } from '../../store/modules/auth';

const { getAuthFetchStatus, getAuthenticated } = authSel;

const mapStateToProps = state => ({
	fetching: getAuthFetchStatus(state),
	authenticated: getAuthenticated(state)
});

export default withRouter(connect(mapStateToProps)(Register));
