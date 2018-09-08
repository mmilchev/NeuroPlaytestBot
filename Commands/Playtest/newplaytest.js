const {
	Command
} = require('discord-akairo');

module.exports = class NPTCommand extends Command {
	constructor() {
		super('newplaytest', {
			aliases: ['newplaytest', 'npt'],
			ownerOnly: true,
			description: 'Adds a new playtest to the DB.',
			args: [{
				id: 'date',
				match: 'content'
			}]
		});
	}
    
	userPermissions(msg) {
		if (this.client.hasPermission(msg.member)) 
			return true;
		else
			return msg.reply('Sorry, you don\'t have permission to start a new playtest.');
	}


	exec(msg, {
		date
	}) {
        
		date = this.client.parseDate(date);
		if (!date) return msg.reply('Couldn\'t parse date format.');
		var remind = this.client.database.REMINDS.create({
			Where: msg.channel.id,
            		When: playtest.When - 1800000,
            		What: `[PT]`,
            		Who: msg.author.id
		});
		this.client.database.PLAYTESTS.create({
			When: date,
			Attendees: [],
			Finished: false,
			Started: false,
			Stage: 0,
			Channel: msg.channel.id,
			Pairs: []
		}).then((ele) => {
			msg.reply({
				embed: msg.client.util.embed()
					.setTitle('A new playtest has been added.')
					.setColor(this.client.config.color)
					.setTimestamp(new Date())
					.setDescription(`
Date: ${date.toString()}
To join, type: \`${this.client.config.prefix} attend ${ele.id}\`
            `)
			});
		});
	}
};
