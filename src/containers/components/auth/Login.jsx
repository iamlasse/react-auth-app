import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const StyledFormGroup = styled(FormGroup)`
	display: flex;
	justify-content: space-around;
`;

const StyledInputGroup = styled(InputGroup)`
	margin-bottom: 1em;
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

	handleLogin = () => {
		const { login } = this.props;
		const { username, password } = this.state;
		login(username, password);
	};

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	render() {
		const { disabled, inline, intent, username, password } = this.state;
		const { fetching } = this.props;
		return (
			<form action="" style={{ maxWidth: 300, margin: 'auto' }}>
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
					<div>
						<Button
							style={{ borderRadius: 50 }}
							disabled={!(username && password)}
							intent="primary"
							large
							fill
							loading={fetching}
							onClick={this.handleLogin}
						>
							Login
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
						{"Don't have an account?"} <Link to="/register">Register</Link>
					</span>
				</StyledFormGroup>
			</form>
		);
	}
}

export default Login;
