const {
	Command
} = require('discord-akairo');

module.exports = class UpcomingCommand extends Command {
	constructor() {
		super('upcoming', {
			aliases: ['upcoming', 'closest', 'uppt'],
			description: 'Gives info about the closest upcoming playtest'
		});
	}

	exec(msg) {
		this.client.database.PLAYTESTS.findOne({where: {Finished: false, When: {$gt: new Date()} },order: [['When', 'ASC']]}).then((ele) => {
			if (ele == null) msg.reply('No upcoming playtest.');
			var players = ele.Attendees.map((ele2) => this.client.users.get(ele2).username).join('\n');
			msg.reply({
				embed: msg.client.util.embed()
					.setTitle(`Info about the upcoming playtest ID:${ele.id}`)
					.setColor(this.client.config.color)
					.setFooter(`When: ${ele.When.toString()} | In: ${this.client.helper.forHumans((ele.When - new Date())/1000)}`)
					.addField('Attendees', players.length == 0 ? 'Noone yet.' : players, true)
					.addField('Stage', ele.Stage, true)
			});
		});
	}
};