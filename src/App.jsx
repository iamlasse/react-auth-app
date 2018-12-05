import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import {
	Navbar,
	Alignment,
	Classes,
	Button,
	Popover,
	Menu,
	MenuItem,
	MenuDivider,
	Position
} from '@blueprintjs/core';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { actions as authActions } from './store/modules/auth';
import store, { history as reduxHistory } from './store';

import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Dashboard from './containers/app/Dashboard';
import Profile from './containers/user/Profile';
import Home from './containers/app/Home';

const StyledLink = styled(Link)`
	&:hover {
		text-decoration: none;
	}
	&:active {
		outline: none;
	}
`;

const ProfileMenu = ({ handleLogout }) => (
	<Menu>
		<Route
			render={({ history }) => (
				<MenuItem
					text="Profile"
					icon="user"
					className={Classes.MINIMAL}
					onClick={() => {
						history.push('/user/profile');
					}}
				/>
			)}
		/>
		<MenuDivider />
		<Route
			render={() => (
				<MenuItem
					text="Sign Out"
					icon="lock"
					className={Classes.MINIMAL}
					onClick={() => {
						handleLogout();
					}}
				/>
			)}
		/>
	</Menu>
);

ProfileMenu.propTypes = {
	handleLogout: PropTypes.func
};

ProfileMenu.defaultProps = {
	handleLogout: null
};

const PrivateRoute = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.authenticated ? <Component {...props} /> : <Redirect to="/login" />}
	/>
);

const AuthRoute = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.authenticated ? <Redirect to="/dashboard" /> : <Component {...props} />}
	/>
);

const UserMenu = ({ authenticated, handleLogout }) => {
	if (authenticated) {
		return (
			<Navbar.Group align={Alignment.RIGHT}>
				<Popover
					content={<ProfileMenu handleLogout={handleLogout} />}
					position={Position.BOTTOM}
				>
					<Button className={Classes.MINIMAL} icon="user" />
				</Popover>
			</Navbar.Group>
		);
	}
	return (
		<Navbar.Group align={Alignment.RIGHT}>
			<StyledLink to="/login">
				<Button className={Classes.MINIMAL} text="Login" />
			</StyledLink>
			<StyledLink to="/register">
				<Button className={Classes.MINIMAL} text="Sign up" />
			</StyledLink>
		</Navbar.Group>
	);
};

UserMenu.propTypes = {
	authenticated: PropTypes.bool,
	handleLogout: PropTypes.func
};

UserMenu.defaultProps = {
	authenticated: false,
	handleLogout: null
};

class App extends React.Component {
	componentDidMount() {
		const { getUser } = this.props;
		getUser();
	}

	render() {
		const { auth: { authenticated }, logout } = this.props;
		return (
			<div>
				<header>
					<Navbar className={Classes.DARK}>
						<Navbar.Group align={Alignment.LEFT}>
							<StyledLink to="/">
								<Button className={Classes.MINIMAL} icon="home" text="Home" />
							</StyledLink>
							{authenticated && (
								<StyledLink to="/dashboard" style={{ textDecoration: 'none' }}>
									<Button
										className={Classes.MINIMAL}
										icon="dashboard"
										text="Dashboard"
									/>
								</StyledLink>
							)}
						</Navbar.Group>
						<UserMenu authenticated={authenticated} handleLogout={logout} />
					</Navbar>
				</header>

				<WrappedMain>
					<AuthRoute exact path="/" component={Home} {...this.props} />
					<Route exact path="/login" component={Login} {...this.props} />
					<AuthRoute exact path="/register" component={Register} {...this.props} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} {...this.props} />
					<PrivateRoute exact path="/user/profile" component={Profile} {...this.props} />
				</WrappedMain>
			</div>
		);
	}
}

const WrappedMain = styled.main`
	padding: 2em;
	display: flex;
	justify-content: center;
	align-self: stretch;
`;

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			getUser: authActions.getUser,
			logout: authActions.logout
		},
		dispatch
	)
});

export const Main = ({ children }) => (
	<Provider store={store}>
		<ConnectedRouter history={reduxHistory}>
			<div>{children}</div>
		</ConnectedRouter>
	</Provider>
);

Main.propTypes = {
	children: PropTypes.instanceOf(Object)
};

Main.defaultProps = {
	children: null
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
