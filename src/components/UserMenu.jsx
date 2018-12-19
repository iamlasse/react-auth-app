import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Alignment, Classes, Button, Popover, Position } from '@blueprintjs/core'
import ProfileMenu from './ProfileMenu'
import { StyledLink } from './AppStyled'

const UserMenu = ({ authenticated, handleLogout }) => {
	if (authenticated) {
		return (
			<Navbar.Group align={Alignment.RIGHT}>
				<Popover
					content={<ProfileMenu handleLogout={handleLogout} />}
					position={Position.BOTTOM}
				>
					<Button icon="user" />
				</Popover>
			</Navbar.Group>
		)
	}
	return (
		<Navbar.Group align={Alignment.RIGHT}>
			<StyledLink to="/signin" className={Classes.MINIMAL}>
				Sign in
			</StyledLink>

			<StyledLink to="/signup" className={Classes.MINIMAL}>
				Sign up
			</StyledLink>
		</Navbar.Group>
	)
}
UserMenu.propTypes = {
	authenticated: PropTypes.bool,
	handleLogout: PropTypes.func
}
UserMenu.defaultProps = {
	authenticated: false,
	handleLogout: null
}

export default UserMenu
