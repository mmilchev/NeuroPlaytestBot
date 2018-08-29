const Sequelize = require('sequelize');

const Database = require('./postgresql');

const database = new Database();

let REMINDS = database.db.define('reminds', {
	Where: { type: Sequelize.STRING },
	When: { type: Sequelize.DATE },
	What: { type: Sequelize.TEXT },
	Who: { type: Sequelize.BIGINT }
});

let SETTINGS = database.db.define('settings', {
	Guild: { type: Sequelize.BIGINT },
	JSON: { type: Sequelize.JSONB }
});

let PLAYER = database.db.define('players', {
	Name: { type: Sequelize.STRING },
	ID: { type: Sequelize.BIGINT },
	MRR: { type: Sequelize.INTEGER }
});

let PLAYTESTS = database.db.define('playtests', {
	When: { type: Sequelize.DATE },
	Attendees: { type: Sequelize.ARRAY(Sequelize.BIGINT) },
	Finished: { type: Sequelize.BOOLEAN },
	Started: { type: Sequelize.BOOLEAN },
	Stage: { type: Sequelize.INTEGER },
	Channel: { type: Sequelize.BIGINT },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	Pairs: { type: Sequelize.JSONB },
=======
	Pairs: { type: Sequelize.JSONB }
>>>>>>> 0d269bdaa3b82a7dbbae2202d0f09175c57aa702
=======
	Pairs: { type: Sequelize.JSONB }
>>>>>>> 0d269bdaa3b82a7dbbae2202d0f09175c57aa702
=======
	Pairs: { type: Sequelize.JSONB }
>>>>>>> 0d269bdaa3b82a7dbbae2202d0f09175c57aa702
});


REMINDS.sync();
SETTINGS.sync();
PLAYER.sync();
PLAYTESTS.sync();

module.exports = { REMINDS, SETTINGS, PLAYER, PLAYTESTS };
