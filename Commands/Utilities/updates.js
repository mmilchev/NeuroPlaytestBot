const { Command } = require('discord-akairo');

module.exports = class UpdatesCommand extends Command {
	constructor() {
		super('updates', {
			aliases: ['updates'],
			usage: 'updates',
			description: 'Shows you the newest updates.'
		});
	}

	async exec(msg) {
		msg.channel.send({embed: msg.client.util.embed()
			.setTitle('Newest Updates')
			.setColor(msg.client.config.color)
			.setTimestamp(new Date())
			.addField('Details', '')});
	}
};
