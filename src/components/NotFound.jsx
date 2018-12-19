import React from 'react'
import { Image, Box, Heading } from 'grommet'
import { Link } from 'react-router-dom'

import notFoundImage from '../assets/images/not-found.png'

const NotFound = () => (
	<Box pad="small" gap="small">
		<Box width="large" height="large" align="center" justify="center">
			<Image src={notFoundImage} fit="contain" style={{ width: 500 }} />
			<Heading level={1} size="xlarge" margin="xsmall" style={{ marginTop: -60 }}>
				404!
			</Heading>
			<Heading level={2}>Error, This page doesn't exist</Heading>
			<Link to="/">Go to Homepage</Link>
		</Box>
	</Box>
)

export default NotFound
