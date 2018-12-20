import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Intent } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { Heading } from "grommet";
import {
  StyledFormActions,
  StyledButton,
  StyledFormWrapper,
  StyledFormGroup,
  StyledInputGroup
} from "./Styled";
import Auth from "../../../constants/Auth";
import AuthButtons from "./AuthButtons";

const auth = new Auth();

const validateForm = values => {
  const errors = {};

  errors.email = !values.email
    ? "Email is missing"
    : !values.email.match(/@/g)
    ? "Email must be valid"
    : undefined;

  errors.password = !values.password ? "Password is missing" : undefined;

  return errors;
};

const InputField = ({ input, ...rest }) => (
  <StyledInputGroup {...input} {...rest} />
);

class Signin extends Component {
  state = {
    disabled: false,
    inline: false,
    intent: Intent.NONE,
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func,
    fetching: PropTypes.bool
  };

  static defaultProps = {
    login: null,
    fetching: false
  };

  handleLoginWithProvider = async provider => {
    try {
      const { loginWith } = this.props;
      const { access_token: accessToken } = await auth.loginWith(provider);
      await loginWith(provider, accessToken);
      const me = await auth.getMe(provider);
      console.log(me);
    } catch (error) {
      // console.log(error)
    }
  };

  handleLoginWithEmailPassword = e => {
    e.preventDefault();
    const { login } = this.props;
    const { username, password } = this.state;
    login(username, password);
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { disabled, inline, intent, username, password } = this.state;
    const { fetching, valid, dirty, pristine } = this.props;
    return (
      <StyledFormWrapper>
        <form
          style={{ maxWidth: 300 }}
          onSubmit={this.handleLoginWithEmailPassword}
        >
          <Heading level={2} style={{ textAlign: "center" }}>
            Login
          </Heading>
          <StyledFormGroup disabled={disabled} inline={inline} intent={intent}>
            <AuthButtons handleAction={this.handleLoginWithProvider} />
            <Field
              name="username"
              round
              leftIcon="person"
              large
              id="username"
              placeholder="Username"
              disabled={disabled}
              intent={intent}
              component={InputField}
            />
            <Field
              name="password"
              round
              large
              leftIcon="lock"
              type="password"
              id="password"
              placeholder="Password"
              disabled={disabled}
              intent={intent}
              component={InputField}
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
              disabled={!valid && (!dirty || !pristine)}
              onClick={this.handleLogin}
            />

            <StyledFormActions>
              {"Don't have an account?"}{" "}
              <Link to="/signup">Create Account</Link>
            </StyledFormActions>
          </StyledFormGroup>
        </form>
      </StyledFormWrapper>
    );
  }
}

const signinWithReduxForm = reduxForm({
  form: "signin",
  validate: validateForm
})(Signin);

export default signinWithReduxForm;
