import React from 'react'
import PropTypes from 'prop-types'
import SearchInput from './SearchInput'
import Image from './Image'
import Loading from './Loading'
import Error from './Error'

const View = ({
	loading,
	error,
	data,
	initialQuery,
	onLoad,
	RenderSearchInput,
	RenderImage,
	RenderLoading,
	RenderError
}) => (
	<div style={{ marginBottom: 50 }}>
		<RenderSearchInput initialQuery={initialQuery} onSearch={onLoad} />
		<section>
			{loading && <RenderLoading />}
			{error && <RenderError error={error} />}
			{!error && !loading && <RenderImage src={data} />}
		</section>
	</div>
)

View.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool,
	initialQuery: PropTypes.string.isRequired,
	RenderImage: PropTypes.func,
	RenderSearchInput: PropTypes.func,
	RenderLoading: PropTypes.func,
	RenderError: PropTypes.func,
	onLoad: PropTypes.func,
	data: PropTypes.string
}

View.defaultProps = {
	RenderSearchInput: SearchInput,
	RenderImage: Image,
	RenderLoading: Loading,
	RenderError: Error,
	onLoad: () => null,
	error: null,
	data: ''
}

export default View
