import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import { Card, Elevation, H3, Spinner, Button, Switch } from '@blueprintjs/core';
import AddNote from './AddNote';

class Profile extends React.Component {
	state = {
		darkTheme: true
	};

	componentDidMount() {
		const { getNotesAsync, theme } = this.props;
		getNotesAsync();
		this.setState({ darkTheme: theme === 'dark' });
	}

	componentWillReceiveProps(nextProps) {
		const { notes } = this.props;
		if (nextProps.notes.length !== notes.length) {
			const { getNotesAsync } = this.props;
			getNotesAsync();
		}
	}

	renderNotes = url => {
		const { notes, selectNote } = this.props;
		return (
			<ul>
				{notes.map(note => (
					<li key={note.id}>
						<Link to={`${url}/note/${note.id}`} onClick={() => selectNote(note.id)}>
							{' '}
							{note.title}
						</Link>
					</li>
				))}
				<li>
					<Link to={`${url}/addNote`}> Add Note</Link>
				</li>
			</ul>
		);
	};

	renderNote = note => (
		<div>
			<h4> {note.title}</h4> <p> {note.text}</p>
		</div>
	);

	saveSettings = () => {
		const { saveSettingsAsync, theme } = this.props;
		const settings = {
			theme: this.state.darkTheme ? 'dark' : 'light',
			lastLogin: new Date()
		};
		saveSettingsAsync(settings);
	};

	handleThemeChange = () => {
		this.setState({ darkTheme: !this.state.darkTheme });
	};

	render() {
		const { profile, notes, match: { url }, fetching, selectedNote, theme } = this.props;
		const { darkTheme } = this.state;
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					paddingTop: 150,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					backgroundColor: '#efefef',
					flexDirection: 'column'
				}}
			>
				<Card elevation={Elevation.ONE}>
					<H3> {profile.username}</H3> <p> {profile.email}</p>
					<Switch
						checked={darkTheme}
						label="Dark Theme"
						onChange={this.handleThemeChange}
					/>
					<Button onClick={this.saveSettings}>Save Settings</Button>
				</Card>{' '}
				{fetching && <Spinner />}{' '}
				{!fetching && (
					<div className="notes">
						{' '}
						{notes && this.renderNotes(url)}{' '}
						{!notes && (
							<h3>
								NO Notes... <Link to={`${url}/addNote`}> add one </Link>
							</h3>
						)}
					</div>
				)}
				<Route exact path={`${url}/addNote`} render={() => <AddNote />} />{' '}
				<Route
					path={`${url}/note/:noteId`}
					render={() => {
						const note = selectedNote;
						return <Fragment>{this.renderNote(note)}</Fragment>;
					}}
				/>
			</div>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.instanceOf(Object),
	notes: PropTypes.instanceOf(Object),
	getNotesAsync: PropTypes.func,
	fetching: PropTypes.bool,
	selectNote: PropTypes.func,
	selectedNote: PropTypes.instanceOf(Object),
	match: PropTypes.instanceOf(Object),
	saveSettingsAsync: PropTypes.func
};

Profile.defaultProps = {
	profile: {},
	notes: [],
	getNotesAsync: null,
	fetching: false,
	selectNote: null,
	selectedNote: {},
	match: {},
	saveSettingsAsync: null
};

export default Profile;
