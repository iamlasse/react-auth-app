import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Elevation, H3 } from '@blueprintjs/core';

class Profile extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div>
				<Card elevation={Elevation.ONE}>
					<H3>{profile.username}</H3>
					<p>{profile.email}</p>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
