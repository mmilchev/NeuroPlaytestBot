const Sequelize = require('sequelize');
const readdir = require('util').promisify(require('fs').readdir);
const auth = require('../Auth/auth.json');
const path = require('path');

class Database {
	constructor(auth) {
		this.database = new Sequelize(auth.postgresPath, { logging: false });
	}

	get db() {
		return this.database;
	}

	start() {
		this.database.authenticate()
			.then(() => { console.log(`Database has been initialized.`); })
			.catch(err => { console.log(`Unable to connect to the database: ${err}`); });
	}
}

module.exports = Database;
