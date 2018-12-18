import React, { Component } from 'react';

export default class NotFound extends Component {
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					width: '100vw'
				}}
			>
				<div className="content" style={{ textAlign: 'center' }}>
					<h1>404!</h1>
					<h2>Error, This page doesn't exist</h2>
				</div>
			</div>
		);
	}
}
