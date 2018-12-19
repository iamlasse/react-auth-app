import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Intent } from '@blueprintjs/core'

import { Link } from 'react-router-dom'
import { Heading } from 'grommet'
import { GooglePlus, FacebookOption } from 'grommet-icons'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import {
	StyledFormWrapper,
	StyledFormActions,
	StyledAuthButtonsWrapper,
	StyledSocialAuthButton,
	StyledButton,
	StyledFormGroup,
	StyledInputGroup
} from './Styled'
import Auth from '../../../constants/Auth'

const auth = new Auth()

class Register extends Component {
	static propTypes = {
		fetching: PropTypes.bool,
		signupUser: PropTypes.func
	}

	static defaultProps = {
		fetching: false,
		signupUser: null
	}

	state = {
		disabled: false,
		inline: false,
		intent: Intent.NONE,
		username: '',
		password: '',
		passwordConfirmation: ''
	}

	handleSignupnWith = async provider => {
		const { loginWith } = this.props
		try {
			const { access_token: accessToken } = await auth.loginWith(provider)
			loginWith(provider, accessToken)
		} catch (error) {
			console.log(error)
		}
	}

	handleRegister = () => {
		// console.log(e)
		const { username, password, passwordConfirmation } = this.state
		const { signupUser } = this.props

		if (password !== passwordConfirmation) return console.error("Passwords don't match")

		if (!username) return console.error('Username empty')

		signupUser(username, password)
		return false
	}

	handleChange = ({ target: { id, value } }) => {
		this.setState({ [id]: value })
	}

	render() {
		const {
			disabled,
			// helperText,
			inline,
			intent,
			// requiredLabel,
			// label,
			username,
			password
		} = this.state
		const { fetching } = this.props

		return (
			<StyledFormWrapper>
				<form onSubmit={this.handleRegister} style={{ maxWidth: 300, margin: 'auto' }}>
					<Heading level={2} style={{ textAlign: 'center' }}>
						Create account
					</Heading>
					<StyledAuthButtonsWrapper>
						<StyledSocialAuthButton
							plain
							primary
							focusIndicator={false}
							label="Sign up with Google"
							color="#ea4335"
							icon={<GooglePlus color="white" size="small" />}
							margin="xsmall"
							fill="true"
							loading={fetching}
							onClick={() => this.handleSignupnWith('google')}
						/>

						<StyledSocialAuthButton
							plain
							primary
							focusIndicator={false}
							label="Sign up with Facebook"
							color="#3b5998"
							icon={<FacebookOption color="white" size="small" />}
							margin="xsmall"
							fill="true"
							loading={fetching}
							onClick={() => this.handleSignupnWith('facebook')}
						/>
					</StyledAuthButtonsWrapper>
					<StyledFormGroup disabled={disabled} inline={inline} intent={intent}>
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
						<StyledInputGroup
							round
							large
							leftIcon="lock"
							type="password"
							id="passwordConfirmation"
							placeholder="Password Again"
							disabled={disabled}
							intent={intent}
							onChange={this.handleChange}
						/>

						<StyledButton
							plain
							primary
							type="submit"
							color="brand-2"
							label="Create account with email"
							large
							fill="true"
							loading={fetching}
							disabled={!(username && password)}
							onClick={this.handleRegister}
						/>

						<StyledFormActions>
							Already have an account?
							<Link to="/signin"> Sign In</Link>
						</StyledFormActions>
					</StyledFormGroup>
				</form>
			</StyledFormWrapper>
		)
	}
}

export default Register
