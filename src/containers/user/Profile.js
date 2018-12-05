import { connect } from 'react-redux';
import Profile from '../components/user/Profile';
import { authSel } from '../../store/modules/auth';

const { getAuthUser } = authSel;

const mapStateToProps = state => ({
	profile: getAuthUser(state)
});

export default connect(mapStateToProps)(Profile);
