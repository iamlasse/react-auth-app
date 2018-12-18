import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, H1 } from '@blueprintjs/core';

class Dashboard extends Component {
	static propTypes = {
		getUsersAsync: PropTypes.func,
		user: PropTypes.instanceOf(Object),
		users: PropTypes.arrayOf(PropTypes.object),
		fetching: PropTypes.bool
	};

	static defaultProps = {
		getUsersAsync: null,
		users: [],
		fetching: false,
		user: {}
	};

	componentDidMount() {
		const { getUsersAsync } = this.props;
		getUsersAsync();
	}

	render() {
		const { users, fetching, user } = this.props;
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#efefef'
				}}
			>
				<H1>Dashboard</H1>
				<p>{user.email}</p>
				{fetching && <Spinner size={40} />}
				{!fetching &&
				users.length && <ul>{users.map(usr => <li key={usr._id}>{usr.username}</li>)}</ul>}
			</div>
		);
	}
}

export default Dashboard;
