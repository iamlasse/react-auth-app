import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Intent } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { GooglePlus, FacebookOption } from 'grommet-icons'
import { Heading } from 'grommet'
import {
	StyledFormActions,
	StyledAuthButtonsWrapper,
	StyledSocialAuthButton,
	StyledButton,
	StyledFormWrapper,
	StyledFormGroup,
	StyledInputGroup
} from './Styled'
import Auth from '../../../constants/Auth'

const auth = new Auth()

class Login extends Component {
	state = {
		disabled: false,
		inline: false,
		intent: Intent.NONE,
		username: '',
		password: ''
	}

	static propTypes = {
		login: PropTypes.func,
		fetching: PropTypes.bool
	}

	static defaultProps = {
		login: null,
		fetching: false
	}

	handleLoginWith = async provider => {
		try {
			const { loginWith } = this.props
			const { access_token: accessToken } = await auth.loginWith(provider)
			await loginWith(provider, accessToken)
			const me = await auth.getMe(provider)
			console.log(me)
		} catch (error) {
			// console.log(error)
		}
	}

	handleLogin = e => {
		e.preventDefault()
		const { login } = this.props
		const { username, password } = this.state
		login(username, password)
	}

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value })
	}

	render() {
		const { disabled, inline, intent, username, password } = this.state
		const { fetching } = this.props
		return (
			<StyledFormWrapper>
				<form style={{ maxWidth: 300 }} onSubmit={this.handleLogin}>
					<Heading level={2} style={{ textAlign: 'center' }}>
						Login
					</Heading>
					<StyledFormGroup disabled={disabled} inline={inline} intent={intent}>
						<StyledAuthButtonsWrapper>
							<StyledSocialAuthButton
								plain
								primary
								focusIndicator={false}
								label="Login with Google"
								color="#ea4335"
								icon={<GooglePlus color="white" size="small" />}
								margin="xsmall"
								fill
								loading={fetching}
								onClick={() => this.handleLoginWith('google')}
							/>

							<StyledSocialAuthButton
								plain
								primary
								focusIndicator={false}
								label="Login with Facebook"
								color="#3b5998"
								icon={<FacebookOption color="white" size="small" />}
								margin="xsmall"
								fill
								loading={fetching}
								onClick={() => this.handleLoginWith('facebook')}
							/>
						</StyledAuthButtonsWrapper>
						<StyledInputGroup
							round
							leftIcon="person"
							large
							id="username"
							placeholder="Username"
							disabled={disabled}
							intent={intent}
							onChange={this.handleChange}
						/>
						<StyledInputGroup
							round
							large
							leftIcon="lock"
							type="password"
							id="password"
							placeholder="Password"
							disabled={disabled}
							intent={intent}
							onChange={this.handleChange}
						/>

						<StyledButton
							primary
							plain
							type="submit"
							label="Login with email"
							color="brand-2"
							large
							fill
							loading={fetching}
							disabled={!(username && password)}
							onClick={this.handleLogin}
						/>

						<StyledFormActions>
							{"Don't have an account?"} <Link to="/signup">Create Account</Link>
						</StyledFormActions>
					</StyledFormGroup>
				</form>
			</StyledFormWrapper>
		)
	}
}

export default Login
