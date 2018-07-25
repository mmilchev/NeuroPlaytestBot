const {
	Command
} = require('discord-akairo');

module.exports = class LPTCommand extends Command {
	constructor() {
		super('listplaytests', {
			aliases: ['listplaytests', 'lpt'],
			description: 'Lists the playtests from the DB',
			args: [{
				id: 'finished',
				match: 'content',
				default: false
			}]
		});
	}

	exec(msg, {finished}) {
		this.client.database.PLAYTESTS.findAll({where: {Finished: finished, When: {$gt: new Date()} },order: [['When', 'DESC']]}).then((ele) => {
			msg.reply({
				embed: msg.client.util.embed()
					.setTitle(finished? 'List of all (upcoming and past) playtests' : 'List of upcoming playtests')
					.setColor(this.client.config.color)
					.setTimestamp(new Date())
					.setDescription(ele.map((pt) => `ID: ${pt.id} | When: ${pt.When.toString()} | Attendees: ${pt.Attendees.length}${finished?` | Finished: ${pt.Finished?'Yes':'No'} `:''}`).join('\n'))
			});
		});
	}
};