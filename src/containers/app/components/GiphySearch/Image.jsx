import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ src }) => (
	<div>{src ? <img src={src} alt="Giphy" /> : <span>No Results Found</span>}</div>
)

Image.propTypes = {
	src: PropTypes.string
}

Image.defaultProps = {
	src: ''
}

export default Image
