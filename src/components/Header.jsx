import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Alignment, Classes, Icon } from '@blueprintjs/core'
import { Box } from 'grommet'
import { StyledLink } from './AppStyled'
import UserMenu from './UserMenu'

const Header = ({ auth: { authenticated }, logout, theme }) => {
	const isHome = (match, location) => {
		if (location.pathname !== '/') return false
		return true
	}

	return (
		<Box style={{ position: 'fixed', width: '100vw' }}>
			<Navbar className={theme === 'dark' ? Classes.DARK : ''}>
				<Navbar.Group align={Alignment.LEFT}>
					<StyledLink to="/" isActive={isHome}>
						<Icon icon="home" style={{ marginRight: 5 }} /> Home
					</StyledLink>
					{authenticated && (
						<StyledLink to="/dashboard" style={{ textDecoration: 'none' }}>
							<Icon icon="dashboard" style={{ marginRight: 5 }} />
							Dashboard
						</StyledLink>
					)}
				</Navbar.Group>
				<UserMenu authenticated={authenticated} handleLogout={logout} />
			</Navbar>
		</Box>
	)
}

Header.propTypes = {
	auth: PropTypes.instanceOf(Object),
	authenticated: PropTypes.bool,
	logout: PropTypes.func,
	theme: PropTypes.instanceOf(Object)
}

Header.defaultProps = {
	auth: {},
	authenticated: null,
	logout: () => null,
	theme: {}
}

export default Header
