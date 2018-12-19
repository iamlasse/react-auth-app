import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SearchInput extends Component {
	static propTypes = {
		initialQuery: PropTypes.string,
		onSearch: PropTypes.func
	}

	static defaultProps = {
		initialQuery: 'dog',
		onSearch: () => null
	}

	componentDidMount() {
		const { onSearch, initialQuery } = this.props
		if (initialQuery) {
			onSearch(initialQuery)
		}
	}

	onSubmit = ev => {
		ev.preventDefault()
		const { onSearch } = this.props
		const query = ev.target.elements.query.value
		onSearch(query)
	}

	render() {
		const { initialQuery } = this.props
		return (
			<section>
				<form onSubmit={this.onSubmit}>
					<div>
						Enter a word or phrase:
						<input type="text" name="query" defaultValue={initialQuery} />
						<button type="submit">Search</button>
					</div>
					<br />
				</form>
			</section>
		)
	}
}
