import React, { Component } from "react";
import PropTypes from "prop-types";
import { Intent } from "@blueprintjs/core";

import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Heading } from "grommet";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import {
  StyledFormWrapper,
  StyledFormActions,
  StyledButton,
  StyledFormGroup,
  StyledInputGroup
} from "./Styled";
import AuthButtons from "./AuthButtons";
import Auth from "../../../constants/Auth";

const auth = new Auth();

const validateForm = values => {
  const errors = {};

  errors.email = !values.email
    ? "Email is Requred"
    : !values.email.match(/@/)
    ? "Must be a valid email"
    : undefined;

  errors.password = !values.password
    ? "Email is Requred"
    : !values.password.match(/[A-Z]/)
    ? "Must contain an uppercase letter"
    : values.password.length <= 5
    ? "Must be longer than 5 characters"
    : undefined;

  errors.passwordConfirmation = !values.passwordConfirmation
    ? "Missing password confirmation"
    : values.password !== values.passwordConfirmation
    ? "Passwords must match"
    : undefined;

  return errors;
};

const InputField = ({ input, ...rest }) => (
  <StyledInputGroup {...input} {...rest} />
);

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
    inline: false,
    intent: Intent.NONE,
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    valid: false
  };

  handleSignupnWith = async provider => {
    const { loginWith } = this.props;
    try {
      const { access_token: accessToken } = await auth.loginWith(provider);
      loginWith(provider, accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  handleSignupWithEmailPassword = e => {
    e.preventDefault();
    const { username, password, passwordConfirmation, email } = this.state;
    const { signupUser } = this.props;

    if (!email) return console.error("Email is empty");

    if (password !== passwordConfirmation)
      return console.error("Passwords don't match");

    if (!username) return console.error("Username empty");

    signupUser(username, password);
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    console.log("object", this.props);
    const { disabled, inline, intent } = this.state;
    const { fetching, valid, pristine, dirty } = this.props;

    return (
      <StyledFormWrapper>
        <form
          onSubmit={this.handleSignupWithEmailPassword}
          style={{ maxWidth: 300, margin: "auto" }}
        >
          <Heading level={2} style={{ textAlign: "center" }}>
            Create account
          </Heading>
          <AuthButtons handleAction={this.handleSignupnWith} />
          <StyledFormGroup disabled={disabled} inline={inline} intent={intent}>
            <Field
              round
              leftIcon="person"
              large
              id="username"
              placeholder="Username"
              disabled={disabled}
              intent={intent}
              name="username"
              component={InputField}
            />
            <Field
              name="email"
              round
              leftIcon="envelope"
              large
              id="email"
              placeholder="email@email.com"
              disabled={disabled}
              intent={intent}
              component={InputField}
            />
            <Field
              name="password"
              round
              leftIcon="lock"
              large
              id="password"
              type="password"
              placeholder="Password"
              disabled={disabled}
              intent={intent}
              component={InputField}
            />

            <Field
              name="passwordConfirmation"
              round
              large
              leftIcon="lock"
              type="password"
              id="passwordConfirmation"
              placeholder="Password Again"
              disabled={disabled}
              intent={intent}
              component={InputField}
            />

            <StyledButton
              plain
              primary
              type="submit"
              color="brand-2"
              label="Create account with email"
              large
              fill
              disabled={!valid && (!dirty || !pristine)}
              loading={fetching}
              onClick={this.handleRegister}
            />

            <StyledFormActions>
              Already have an account?
              <Link to="/signin"> Sign In</Link>
            </StyledFormActions>
          </StyledFormGroup>
        </form>
      </StyledFormWrapper>
    );
  }
}

const registerWithReduxForm = reduxForm({
  form: "signup",
  validate: validateForm
})(Register);

export default registerWithReduxForm;
