import React from 'react';
import PropTypes from 'prop-types';
import { Card, Elevation, H3 } from '@blueprintjs/core';

const Profile = props => {
	const { profile } = props;
	return (
		<div>
			<Card elevation={Elevation.ONE}>
				<H3>{profile.username}</H3>
				<p>{profile.email}</p>
			</Card>
		</div>
	);
};

Profile.propTypes = {
	profile: PropTypes.instanceOf(Object)
};

Profile.defaultProps = {
	profile: {}
};

export default Profile;
