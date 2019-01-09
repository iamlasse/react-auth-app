import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { base } from 'grommet/themes'
import { Grommet } from 'grommet'
import customTheme from './theme'
import { actions as authActions, authSel } from './store/modules/auth'
import { getSettingsAsync } from './store/modules/user/actions'
import { StyledWrappedMain } from './components/AppStyled'
import Auth from './constants/Auth'
import Header from './components/Header'
import Routes from './components/Routes'
import './App.css'
import NetworkChecker from "./components/NetworkChecker";

const socialAuth = new Auth()

class App extends React.Component {
	theme = { ...base, ...customTheme }

	componentDidMount() {
		const {
			getUser,
			router: { location }
		} = this.props
		getUser({ redirectTo: location })
	}

	render() {
		const { online, offline } = this.props.settings
		return (
			<Grommet theme={this.theme}>
				<Header {...this.props} />
				<StyledWrappedMain fill="true">
					<Routes {...this.props} />
				</StyledWrappedMain>
				<NetworkChecker offline={offline} online={online} />
			</Grommet>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	fetching: authSel.getAuthFetchStatus(state.auth),
	theme: state.user.settings.theme,
	router: state.router,
	settings: state.user.settings,
	socialAuth
})

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			getUser: authActions.getUser,
			getSettings: getSettingsAsync,
			logout: authActions.logout
		},
		dispatch
	)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
