import React from 'react'
import PropTypes from 'prop-types'
import { FacebookOption, GooglePlus } from "grommet-icons";
import { StyledAuthButtonsWrapper, StyledSocialAuthButton } from "./Styled";

const AuthButtons = ({ handleAction, fetching}) =>  (
    <StyledAuthButtonsWrapper>
      <StyledSocialAuthButton
        plain
        primary
        focusIndicator={false}
        label="Sign up with Google"
        color="#ea4335"
        icon={<GooglePlus color="white" size="small" />}
        margin="xsmall"
        fill
        loading={fetching}
        onClick={() => handleAction('google')}
      />

      <StyledSocialAuthButton
        plain
        primary
        focusIndicator={false}
        label="Sign up with Facebook"
        color="#3b5998"
        icon={<FacebookOption color="white" size="small" />}
        margin="xsmall"
        fill
        loading={fetching}
        onClick={() => handleAction('facebook')}
      />
    </StyledAuthButtonsWrapper>
  )


AuthButtons.propTypes = {
  handleAction: PropTypes.func.isRequired,
  fetching: PropTypes.bool
}

AuthButtons.defaultProps = {
  fetching: false
}

export default AuthButtons
