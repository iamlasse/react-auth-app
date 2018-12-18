import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { goBack } from 'react-router-redux';
import { actions } from '../../../store/modules/notes';

class AddNote extends React.Component {
	static propTypes = {
		addNote: PropTypes.func,
		goBack: PropTypes.func
	};

	static defaultProps = {
		addNote: null,
		goBack: null
	};

	state = {
		noteText: '',
		noteTitle: '',
		valid: false
	};

	addNote = () => {
		const { addNote, goBack: go } = this.props;
		const { noteText, noteTitle } = this.state;
		if (!noteText && !noteTitle) return;
		addNote({ text: noteText, title: noteTitle });
		this.setState({ noteText: '', noteTitle: '' });
		go('/user');
	};

	validateForm = (prop, e) => {
		const { noteText, noteTitle } = this.state;
		if (noteText && noteTitle) {
			this.setState({ valid: true });
		}

		this.setState({ [prop]: e.target.value });
	};

	render() {
		const { valid } = this.state;
		return (
			<Fragment>
				<h2>Add Note</h2>
				<FormGroup>
					<InputGroup
						id="noteTitle"
						onChange={e => this.validateForm('noteTitle', e)}
						placeholder="Add Title"
					/>
					<InputGroup
						id="noteText"
						onChange={e => this.validateForm('noteText', e)}
						type="textarea"
						placeholder="Add Note"
					/>
					<div
						className="actions"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'row',
							marginTop: '1em',
							justifyContent: 'space-between'
						}}
					>
						<Button disabled={!valid} text="Save Note" onClick={this.addNote} />
						<Link to="/user">Cancel</Link>
					</div>
				</FormGroup>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	notes: state.notes.list
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{
			addNote: actions.addNoteAsync
		},
		dispatch
	),
	goBack: () => dispatch(goBack())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
