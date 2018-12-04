import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { H1, Spinner } from '@blueprintjs/core';
import { getUsers } from '../../store/modules/users/users';
import { bindActionCreators } from 'redux';
import { component as User, selectors as userSel, actions as userActions } from '../../store/modules/users';
export class Dashboard extends Component {
	static propTypes = {};
	componentDidMount() {
		this.props.getUsersAsync();
	}

	render() {
		const { users, fetching } = this.props;
		return (
			<div>
				<H1>Dashboard</H1>
				<p>{this.props.user.email}</p>
				{fetching && <Spinner size={40} />}
				{!fetching &&
				users.length && <ul>{this.props.users.map((user, index) => <li key={index}>{user.username}</li>)}</ul>}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.auth.user,
	users: state.user.users,
	fetching: state.user.fetching
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			getUsersAsync: userActions.usersFetch
		},
		dispatch
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
