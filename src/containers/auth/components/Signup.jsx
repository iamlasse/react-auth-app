import React from "react";
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
  StyledInputGroup,
  StyledLoadingIcon
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

const Signup = ({
  fetching,
  valid,
  pristine,
  dirty,
  handleSubmit,
  loginWith,
  signupUser
}) => {
  const handleSignupnWith = async provider => {
    try {
      const { access_token: accessToken } = await auth.loginWith(provider);
      loginWith(provider, accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupWithEmailPassword = ({ email, password, username }) => {
    signupUser({ username, password, email });
  };

  const intent = Intent.NONE;

  return (
    <StyledFormWrapper>
      <form
        onSubmit={handleSubmit(handleSignupWithEmailPassword)}
        style={{ maxWidth: 300, margin: "auto" }}
      >
        <Heading level={2} style={{ textAlign: "center" }}>
          Create account
        </Heading>
        <AuthButtons handleAction={handleSignupnWith} />
        <StyledFormGroup intent={intent}>
          <Field
            round
            leftIcon="person"
            large
            id="username"
            placeholder="Username"
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
            intent={intent}
            component={InputField}
          />

          <StyledButton
            plain
            primary
            type="submit"
            color="brand-2"
            label=""
            large
            fill
            disabled={!valid && (!dirty || !pristine)}
            loading={fetching}
            onClick={handleSubmit(handleSignupWithEmailPassword)}
          >
            {fetching && (
              <StyledLoadingIcon
                color="white"
                size="small"
                style={{ marginRight: 10 }}
              />
            )}
            Create account with email
          </StyledButton>

          <StyledFormActions>
            Already have an account?
            <Link to="/signin"> Sign In</Link>
          </StyledFormActions>
        </StyledFormGroup>
      </form>
    </StyledFormWrapper>
  );
};

const signupWithReduxForm = reduxForm({
  form: "signup",
  validate: validateForm
})(Signup);

export default signupWithReduxForm;
