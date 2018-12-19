import React, { Component } from 'react'
import { connect } from 'react-redux'

export default ChildComponent => {
	class ComposedComponent extends Component {
		// Our component just got rendered
		componentDidMount() {
			this.shouldNavigateAway()
		}

		// Our component just got updated
		componentDidUpdate() {
			this.shouldNavigateAway()
		}

		shouldNavigateAway() {
			const { authenticated, history } = this.props
			if (!authenticated) {
				history.replace('/signin')
			}
		}

		render() {
			return <ChildComponent {...this.props} />
		}
	}
	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated }
	}
	return connect(mapStateToProps)(ComposedComponent)
}
