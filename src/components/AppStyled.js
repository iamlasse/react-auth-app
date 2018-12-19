import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Colors } from '@blueprintjs/core'

export const StyledWrapper = styled.div`
			display: flex
			flex: 1
			align-items: center
			justify-content: center
			height: 100vh
			width: 100vw
			text-align: center
			flex-direction: column
`

export const StyledWrappedMain = styled.div`
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
    background-color: #f9f9f9
`

export const StyledLink = styled(NavLink)`
	
	align-items: center;
    justify-content: center;
		display: flex;
		height: 100%

	padding: 10px 20px
	font-weight: bold
	transition: all 0.5s ease
	&:hover {
		text-decoration: none;
			
	}
	&.active {
		outline: none;
		color: ${Colors.WHITE}
		background-color: ${Colors.BLUE3}
	}
`
