import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, InputGroup, Intent, Colors } from '@blueprintjs/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { GooglePlus, Facebook } from 'grommet-icons';
import { Button as GButton } from 'grommet';
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
		outline: none
	}
`;

class Login extends Component {
	state = {
		disabled: false,
		inline: false,
		intent: Intent.NONE,
		username: '',
		password: ''
	};

	static propTypes = {
		login: PropTypes.func,
		fetching: PropTypes.bool
	};

	static defaultProps = {
		login: null,
		fetching: false
	};

	handleLoginWith = async provider => {
		try {
			const { loginWith } = this.props;
			const { access_token } = await auth.loginWith(provider);
			loginWith(provider, access_token);
		} catch (error) {
			console.log(error);
		}
	};

	handleLogin = e => {
		e.preventDefault();
		const { login } = this.props;
		const { username, password } = this.state;
		login(username, password);
	};

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	render() {
		console.log('Props for login: ', this.props);

		const { disabled, inline, intent, username, password } = this.state;
		const { fetching } = this.props;
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#efefef'
				}}
			>
				<form style={{ maxWidth: 300 }} onSubmit={this.handleLogin}>
					<h2 style={{ textAlign: 'center' }}>Login</h2>
					<StyledFormGroup disabled={disabled} inline={inline} intent={intent}>
						<div className="social-auth" style={{ marginBottom: 10 }}>
							<StyledButton
								plain
								primary
								focusIndicator={false}
								label="Login with Google"
								color={'#ea4335'}
								icon={<GooglePlus color="white" />}
								margin="xsmall"
								fill
								loading={fetching}
								onClick={() => this.handleLoginWith('google')}
							/>

							<StyledButton
								plain
								primary
								focusIndicator={false}
								label="Login with Facebook"
								color={'#3b5998'}
								icon={<Facebook color="white" />}
								margin="xsmall"
								fill
								loading={fetching}
								onClick={() => this.handleLoginWith('facebook')}
							/>
						</div>
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
						<div>
							<StyledButton
								primary
								type="submit"
								label="Login with email"
								color={'black'}
								large
								fill
								loading={fetching}
								disabled={!(username && password)}
								onClick={this.handleLogin}
							/>
						</div>
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: 20,
								justifyContent: 'space-between'
							}}
						>
							{"Don't have an account?"} <Link to="/signup">Create Account</Link>
						</span>
					</StyledFormGroup>
				</form>
			</div>
		);
	}
}

export default Login;
