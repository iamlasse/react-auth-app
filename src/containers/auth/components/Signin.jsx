import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Intent, Icon } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { Heading } from "grommet";
import { Cycle } from "grommet-icons";
import {
  StyledFormActions,
  StyledButton,
  StyledFormWrapper,
  StyledFormGroup,
  StyledInputGroup,
  StyledLoadingIcon
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

const Signin = ({
  fetching,
  valid,
  dirty,
  pristine,
  handleSubmit,
  loginWith,
  login
}) => {
  console.log("object", fetching);
  const intent = Intent.NONE;

  const handleLoginWithProvider = async provider => {
    try {
      const { access_token: accessToken } = await auth.loginWith(provider);
      await loginWith(provider, accessToken);
      const me = await auth.getMe(provider);
      console.log(me);
    } catch (error) {
      // console.log(error)
    }
  };

  const handleLoginWithEmailPassword = ({ username, password }) => {
    login(username, password);
  };
  return (
    <StyledFormWrapper>
      <form
        style={{ maxWidth: 300 }}
        onSubmit={handleSubmit(handleLoginWithEmailPassword)}
      >
        <Heading level={2} style={{ textAlign: "center" }}>
          Login
        </Heading>
        <StyledFormGroup intent={intent}>
          <AuthButtons handleAction={handleLoginWithProvider} />
          <Field
            name="username"
            round
            type="email"
            leftIcon="person"
            large
            id="username"
            placeholder="Username"
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
            intent={intent}
            component={InputField}
          />

          <StyledButton
            primary
            plain
            type="submit"
            color="brand-2"
            large
            fill
            round
            disabled={!valid && (!dirty || !pristine)}
            onClick={handleSubmit(handleLoginWithEmailPassword)}
          >
            {fetching && (
              <StyledLoadingIcon
                color="white"
                size="small"
                style={{ marginRight: 10 }}
              />
            )}
            Sign in with email
          </StyledButton>

          <StyledFormActions>
            {"Don't have an account?"} <Link to="/signup">Create Account</Link>
          </StyledFormActions>
        </StyledFormGroup>
      </form>
    </StyledFormWrapper>
  );
};

Signin.propTypes = {
  loginWith: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};
Signin.defaultProps = {};

const signinWithReduxForm = reduxForm({
  form: "signin",
  validate: validateForm
})(Signin);

export default signinWithReduxForm;
