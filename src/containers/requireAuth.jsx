import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
	class ComposedComponent extends Component {
		// Our component just got rendered
		componentDidMount() {
			this.shouldNavigateAway();
		}

		componentWillReceiveProps(nextProps) {
			console.log('Navigate to: ', nextProps.location, this.props.location);

			// var routeChanged = nextProps.location !== this.props.location
			// this.setState({ showBackButton: routeChanged })
		}

		// Our component just got updated
		componentDidUpdate() {
			this.shouldNavigateAway();
		}

		shouldNavigateAway() {
			const { authenticated, history } = this.props;
			if (!authenticated) {
				history.replace('/');
			}
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}
	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated };
	}
	return connect(mapStateToProps)(ComposedComponent);
};
