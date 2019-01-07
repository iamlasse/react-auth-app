import React, { Fragment } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import AppToaster from '../constants/AppToaster'

// Components
import Signin from '../containers/auth/Signin'
import Signup from '../containers/auth/Signup'
import Dashboard from '../containers/app/Dashboard'
import Profile from '../containers/user/Profile'
import Home from '../containers/app/Home'
import NotFound from './NotFound'

const PrivateRoute = ({ auth, component: Component, children, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.authenticated ? (
				<Component {...props} />
			) : (
					<Fragment>
						{AppToaster.show({
							message: 'Please log in to access that page',
							intent: 'primary'
						})}
						<Redirect to="/signin" />
					</Fragment>
				)
		}
	/>
)

const AuthRoute = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth.authenticated ? <Redirect to="/dashboard" /> : <Component {...props} />
		}
	/>
)

export default function Routes(props) {
	return (
		<Switch>
			<AuthRoute exact path="/" component={Home} {...props} />
			<AuthRoute exact path="/signin" component={Signin} {...props} />
			<AuthRoute exact path="/signup" component={Signup} {...props} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} {...props} />
			<PrivateRoute path="/user" component={Profile} {...props} />
			<Route path="/auth/callback" render={() => <h2>Auth Redirect....</h2>} />
			<Route component={NotFound} />
		</Switch>
	)
}
