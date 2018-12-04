import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner, H1 } from '@blueprintjs/core';
import { bindActionCreators } from 'redux';
import {
  component as User,
  selectors as userSel,
  actions as userActions
} from '../../store/modules/users';

export class Dashboard extends Component {
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
			<div>
				<H1>Dashboard</H1>
				<p>{user.email}</p>
				{fetching && <Spinner size={40} />}
				{!fetching
				&& users.length && <ul>{users.map(usr => <li key={usr.id}>{usr.username}</li>)}</ul>}
			</div>
	  );
	}
}

const mapStateToProps = state => ({
  user: state.auth.user,
  users: state.user.users,
  fetching: state.user.fetching
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getUsersAsync: userActions.usersFetch
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
