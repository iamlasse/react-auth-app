import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core'

const ProfileMenu = ({ handleLogout }) => (
	<Menu>
		<Route
			render={({ history }) => (
				<MenuItem
					text="Profile"
					icon="user"
					onClick={() => {
						history.push('/user')
					}}
				/>
			)}
		/>
		<MenuDivider />
		<MenuItem text="Sign Out" icon="lock" onClick={handleLogout} />
	</Menu>
)
ProfileMenu.propTypes = {
	handleLogout: PropTypes.func
}
ProfileMenu.defaultProps = {
	handleLogout: null
}

export default ProfileMenu
