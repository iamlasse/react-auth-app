import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const StyledFormGroup = styled(FormGroup)`
	display: flex;
	justify-content: space-around;
`;

const StyledInputGroup = styled(InputGroup)`
	margin-bottom: 1em;
`;

class Register extends Component {
	static propTypes = {
		fetching: PropTypes.bool
	};

	static defaultProps = {
		fetching: false
	};

	state = {
		disabled: false,
		// helperText: true,
		inline: false,
		intent: Intent.NONE,
		// label: true,
		// requiredLabel: false,
		username: '',
		password: ''
	};

	handleRegister = () => {};

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
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
			password
		} = this.state;
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
{' '}
<Link to="/login">Login</Link>
					</span>
				</StyledFormGroup>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	fetching: state.auth.fetching,
	authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(Register));
