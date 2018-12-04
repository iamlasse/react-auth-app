import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Navbar, Alignment, Classes, Button, Popover, Menu, MenuItem, MenuDivider, Position } from '@blueprintjs/core';
import { bindActionCreators } from 'redux';
import { actions as authActions } from './store/modules/auth';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';

import Login from './containers/app/Login';
import Register from './containers/app/Register';
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
			render={({ history }) => (
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

const PrivateRoute = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			return auth.authenticated ? <Component {...props} /> : <Redirect to="/login" />;
		}}
	/>
);

const AuthRoute = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			return auth.authenticated ? <Redirect to="/dashboard" /> : <Component {...props} />;
		}}
	/>
);

const UserMenu = ({ authenticated, handleLogout }) => {
	if (authenticated) {
		return (
			<Navbar.Group align={Alignment.RIGHT}>
				<Popover content={<ProfileMenu handleLogout={handleLogout} />} position={Position.BOTTOM}>
					<Button className={Classes.MINIMAL} icon="user" />
				</Popover>
			</Navbar.Group>
		);
	} else {
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
	}
};

class App extends React.Component {
	componentDidMount() {
		this.props.getUser();
	}

	render() {
		return (
			<div>
				<header>
					<Navbar className={Classes.DARK}>
						<Navbar.Group align={Alignment.LEFT}>
							<StyledLink to="/">
								<Button className={Classes.MINIMAL} icon="home" text="Home" />
							</StyledLink>
							{this.props.auth.authenticated && (
								<StyledLink to="/dashboard" style={{ textDecoration: 'none' }}>
									<Button className={Classes.MINIMAL} icon="dashboard" text="Dashboard" />
								</StyledLink>
							)}
						</Navbar.Group>
						<UserMenu authenticated={this.props.auth.authenticated} handleLogout={this.props.logout} />
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

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	...bindActionCreators(
		{
			getUser: authActions.getUser,
			logout: authActions.logout
		},
		dispatch
	)
});

export class Main extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div>{this.props.children}</div>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
