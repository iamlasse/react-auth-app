import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'
import { Heading, Paragraph } from 'grommet'
import { StyledWrapper } from '../../../components/AppStyled'
import GiphySearch from './GiphySearch'
import SpinLoad from './GiphySearch/SpinLoad'

class Dashboard extends Component {
	static propTypes = {
		getUsersAsync: PropTypes.func,
		user: PropTypes.instanceOf(Object),
		users: PropTypes.arrayOf(PropTypes.object),
		fetching: PropTypes.bool
	}

	static defaultProps = {
		getUsersAsync: () => null,
		users: [],
		fetching: false,
		user: {}
	}

	componentDidMount() {
		const { getUsersAsync } = this.props
		// getUsersAsync();
	}

	render() {
		const { users, fetching, user } = this.props
		return (
			<StyledWrapper>
				<Heading level={1}>Dashboard</Heading>
				<GiphySearch initialQuery="dog" RenderLoading={SpinLoad} />
				<Paragraph>{user.email}</Paragraph>
			</StyledWrapper>
		)
	}
}

export default Dashboard
