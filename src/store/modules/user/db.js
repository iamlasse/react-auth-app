import NeDB from 'nedb';

class UserDB {
	constructor(name) {
		this.instance = new NeDB({ filename: `./${name}.db`, autoload: true });
		this.instance.ensureIndex({ fieldName: 'userId', unique: true });
		// this.instance.remove({}, { multi: true }, function(err, numRemoved) {});
		this.instance.loadDatabase();
	}

	destroy() {
		this.instance.destroy();
	}

	getSettingsFromDB(id) {
		return new Promise((resolve, reject) => {
			this.instance.findOne({ userId: id }, (err, foundDoc) => {
				console.log('NEDB returned: ', err, foundDoc);

				if (err) return reject(err);

				return resolve(foundDoc);
			});
		});
	}

	async getSettings(id) {
		try {
			// Test
			const doc = await this.getSettingsFromDB(id);
			console.log('Settings retrieved: ', doc);

			return doc || null;
		} catch (error) {
			return error;
		}
	}

	saveSettingsToDB(settings, userId) {
		return new Promise((resolve, reject) => {
			this.instance.insert({ userId, ...settings }, (err1, newDoc) => {
				console.log('Doc saved: ', err1, newDoc);

				if (err1 !== null) {
					this.instance.update(
						{ userId },
						{ $set: { theme: settings.theme } },
						(err2, num) => {
							return resolve(num);
						}
					);
				}

				this.instance.findOne({ userId }, (err3, foundDoc) => {
					if (err3) return reject(err3);

					return resolve(foundDoc);
				});
			});
		});
	}

	async saveSettings(userId, settings) {
		try {
			// Save settings to db with promise
			const doc = await this.saveSettingsToDB(settings, userId);

			console.log('Settings saved: ', doc);

			return doc;
		} catch (error) {
			return error;
		}
	}
}

export default UserDB;
