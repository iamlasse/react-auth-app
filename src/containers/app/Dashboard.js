import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as userActions, userSel } from '../../store/modules/users'
import { authSel } from '../../store/modules/auth'
import Dashboard from './components/Dashboard'
import requireAuth from '../requireAuth'

const { getUsers, getFetchStatus } = userSel
const { getAuthUser } = authSel
const mapStateToProps = state => ({
	user: getAuthUser(state),
	users: getUsers(state),
	fetching: getFetchStatus(state)
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			getUsersAsync: userActions.usersFetch
		},
		dispatch
	)
})

export default requireAuth(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Dashboard)
)
