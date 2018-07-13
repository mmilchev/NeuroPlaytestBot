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
		return this.client.hasPermission(msg.member);
	}


	exec(msg, {
		date
	}) {
        
		date = this.client.parseDate(date);
		if (!date) return msg.reply('Couldn\'t parse date format.');
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