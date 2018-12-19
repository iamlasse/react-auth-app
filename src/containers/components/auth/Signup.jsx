import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button as GButton } from 'grommet';
import { GooglePlus, Facebook } from 'grommet-icons';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import Auth from '../../../constants/Auth';
const auth = new Auth();

const StyledFormGroup = styled(FormGroup)`
display: flex;
justify-content: space-around;
`;

const StyledInputGroup = styled(InputGroup)`
margin-bottom: 1em;
`;

const StyledButton = styled(GButton)`
  padding: 8px;
  border-radius: 50px !important;
  color: #fff
	outline: none
	&:active, &:visited {
    outline: none;
  }
`;

class Register extends Component {
	static propTypes = {
		fetching: PropTypes.bool,
		signupUser: PropTypes.func
	};

	static defaultProps = {
		fetching: false,
		signupUser: null
	};

	state = {
		disabled: false,
		// helperText: true,
		inline: false,
		intent: Intent.NONE,
		// label: true,
		// requiredLabel: false,
		username: '',
		password: '',
		passwordConfirmation: ''
	};

	handleSignupnWith = async provider => {
		const { loginWith } = this.props;
		try {
			const { access_token } = await auth.loginWith(provider);
			loginWith(provider, access_token);
		} catch (error) {
			console.log(error);
		}
	};

	handleRegister = e => {
		console.log(e);
		const { username, password, passwordConfirmation } = this.state;
		const { signupUser } = this.props;

		if (password !== passwordConfirmation) return console.error("Passwords don't match");

		if (!username) return console.error('Username empty');

		signupUser(username, password);
		return false;
	};

	handleChange = ({ target: { id, value } }) => {
		this.setState({ [id]: value });
	};

	render() {
		const {
			disabled,
			// helperText,
			inline,
			intent,
			// requiredLabel,
			// label,
			username,
			password,
			passwordConfirmation
		} = this.state;
		const { fetching } = this.props;

		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					width: '100vw',
					backgroundColor: '#efefef'
				}}
			>
				<form onSubmit={this.handleRegister} style={{ maxWidth: 300, margin: 'auto' }}>
					<h2 style={{ textAlign: 'center' }}>Create account</h2>
					<div className="auth-buttons">
						<StyledButton
							plain
							primary
							focusIndicator={false}
							label="Sign up with Google"
							color={'#ea4335'}
							icon={<GooglePlus color="white" />}
							margin="xsmall"
							fill
							loading={fetching}
							onClick={() => this.handleSignupnWith('google')}
						/>

						<StyledButton
							plain
							primary
							focusIndicator={false}
							label="Sign up with Facebook"
							color={'#3b5998'}
							icon={<Facebook color="white" />}
							margin="xsmall"
							fill
							loading={fetching}
							onClick={() => this.handleSignupnWith('facebook')}
						/>
					</div>
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
						<div>
							<Button
								style={{ borderRadius: 50 }}
								disabled={!(username && password && passwordConfirmation)}
								intent="primary"
								large
								fill
								loading={fetching}
								onClick={this.handleRegister}
							>
								Register
							</Button>
						</div>
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: 20,
								justifyContent: 'space-between'
							}}
						>
							Already have an account?
							<Link to="/signin"> Sign In</Link>
						</span>
					</StyledFormGroup>
				</form>
			</div>
		);
	}
}

export default Register;
