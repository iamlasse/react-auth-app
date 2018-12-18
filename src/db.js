import PouchDB from 'pouchdb';

class NotesDB {
	constructor(name) {
		this.instance = new PouchDB(name);
	}

	destroy() {
		this.instance.destroy();
	}

	async getAllNotes() {
		try {
			const allDocs = await this.instance.allDocs({ include_docs: true });
			let notes = {};
			notes = allDocs.rows.map(row => ({ id: row.id, ...row.doc }));
			return notes;
		} catch (error) {
			return error.message;
		}
	}

	async getNote(id) {
		try {
			const note = await this.instance.get(id);
			return note;
		} catch (error) {
			return error.message;
		}
	}

	async createNote(note) {
		const newNote = {
			...note,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		const { id } = await this.instance.post({ ...newNote });
		const doc = await this.instance.get(id);
		const newDoc = {
			...doc,
			id
		};
		console.log('Doc: ', doc);

		return { id, doc: newDoc };
	}
}

export default NotesDB;
