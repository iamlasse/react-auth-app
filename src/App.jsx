import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';
import {
	Navbar,
	Alignment,
	Classes,
	Button,
	Icon,
	Popover,
	Menu,
	MenuItem,
	MenuDivider,
	Position,
	Colors
} from '@blueprintjs/core';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { actions as authActions, authSel } from './store/modules/auth';
import { grommet } from 'grommet/themes';
import { Grommet } from 'grommet';

// Components
import Signin from './containers/auth/Signin';
import Signup from './containers/auth/Signup';
import Dashboard from './containers/app/Dashboard';
import Profile from './containers/user/Profile';
import Home from './containers/app/Home';
import { getSettingsAsync } from './store/modules/user/actions';
import NotFound from './NotFound';

import Auth from './constants/Auth';
const auth = new Auth();

const StyledLink = styled(NavLink)`
	
	align-items: center;
    justify-content: center;
		display: flex;
		height: 100%

	padding: 10px 20px
	font-weight: bold
	transition: all 0.5s ease
	&:hover {
		text-decoration: none;
			
	}
	&.active {
		outline: none;
		color: ${Colors.WHITE}
		background-color: ${Colors.BLUE3}
	}
`;

const ProfileMenu = ({ handleLogout }) => (
	<Menu>
		<Route
			render={({ history }) => (
				<MenuItem
					text="Profile"
					icon="user"
					onClick={() => {
						history.replace('/user');
					}}
				/>
			)}
		/>
		<MenuDivider />

		<MenuItem
			text="Sign Out"
			icon="lock"
			onClick={() => {
				handleLogout();
			}}
		/>
	</Menu>
);

ProfileMenu.propTypes = {
	handleLogout: PropTypes.func
};

ProfileMenu.defaultProps = {
	handleLogout: null
};

const PrivateRoute = ({ auth, component: Component, children, ...rest }) => (
	<Route
		{...rest}
		render={props => (auth.authenticated ? <Component {...props} /> : <Redirect to="/" />)}
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
					<Button icon="user" />
				</Popover>
			</Navbar.Group>
		);
	}
	return (
		<Navbar.Group align={Alignment.RIGHT}>
			<StyledLink to="/signin" className={Classes.MINIMAL}>
				Sign in
			</StyledLink>

			<StyledLink to="/signup" className={Classes.MINIMAL}>
				Sign up
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
	privateRoutes = [
		'/dashboard',
		'/user'
	];

	componentDidMount() {
		const { getUser, router: { location } } = this.props;
		console.log(location);
		// if (location.pathname.includes(this.privateRoutes)) {
		getUser();
		// }
	}

	componentDidUpdate(prevProps) {
		const { getSettings, fetching, auth } = this.props;
		if (!fetching && auth.user) {
			const { auth: { user: { _id: id } } } = this.props;
			getSettings(id);
		}
	}

	isHome = (match, location) => {
		if (location.pathname !== '/') return false;
		return true;
	};

	render() {
		console.log('Props for app: ', this.props);

		const { auth: { authenticated }, logout, theme } = this.props;
		return (
			<Grommet theme={grommet}>
				<header style={{ position: 'fixed', width: '100vw' }}>
					<Navbar className={theme === 'dark' ? Classes.DARK : ''}>
						<Navbar.Group align={Alignment.LEFT}>
							<StyledLink to="/" isActive={this.isHome}>
								<Icon icon="home" style={{ marginRight: 5 }} /> Home
							</StyledLink>
							{authenticated && (
								<StyledLink to="/dashboard" style={{ textDecoration: 'none' }}>
									<Icon icon="dashboard" style={{ marginRight: 5 }} />
									Dashboard
								</StyledLink>
							)}
						</Navbar.Group>
						<UserMenu authenticated={authenticated} handleLogout={logout} />
					</Navbar>
				</header>

				<WrappedMain>
					<Switch>
						<AuthRoute exact path="/" component={Home} {...this.props} />
						<AuthRoute exact path="/signin" component={Signin} {...this.props} />
						<AuthRoute exact path="/signup" component={Signup} {...this.props} />
						<Route exact path="/dashboard" component={Dashboard} {...this.props} />
						<Route path="/user" component={Profile} {...this.props} />
						<Route
							path="/auth/callback"
							render={({ match }) => <h2>Auth Redirect....</h2>}
						/>
						<Route component={NotFound} />
					</Switch>
				</WrappedMain>
			</Grommet>
		);
	}
}

const WrappedMain = styled.main`
	display: flex;
	justify-content: center;
	align-self: stretch;
`;

const mapStateToProps = state => ({
	auth: state.auth,
	fetching: authSel.getAuthFetchStatus(state.auth),
	theme: state.user.settings.theme,
	router: state.router,
	socialAuth: auth
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			getUser: authActions.getUser,
			getSettings: getSettingsAsync,
			logout: authActions.logout
		},
		dispatch
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
