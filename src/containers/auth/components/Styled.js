import styled from 'styled-components'
import { Button as GButton } from 'grommet'
import { FormGroup, InputGroup } from '@blueprintjs/core'

export const StyledFormWrapper = styled.div`
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
    background-color: #efefef
`

export const StyledFormActions = styled.div`
  display: flex
  align-items: center
  margin-top: 30px
  justify-content: space-between
  padding: 10px 0
`

export const StyledFormGroup = styled(FormGroup)`
	display: flex;
	justify-content: space-around;
`

export const StyledInputGroup = styled(InputGroup)`
	margin-bottom: 1em;
`

export const StyledAuthButtonsWrapper = styled.div`
	align-items: center
	display: flex
	flex-direction: column
	margin-bottom: 10px
`

export const StyledSocialAuthButton = styled(GButton)`
	color: #fff
  outline: none
  	padding: 10px 12px;
	&:active, &:visited {
		outline: none;
	}
`

export const StyledButton = styled(StyledSocialAuthButton)``
