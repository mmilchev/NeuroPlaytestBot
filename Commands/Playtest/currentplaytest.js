const {
	Command
} = require('discord-akairo');

module.exports = class CurrentCommand extends Command {
	constructor() {
		super('current', {
			aliases: ['current', 'cpt'],
			description: 'Gives info about the current playtest'
		});
	}

	exec(msg) {
		this.client.database.PLAYTESTS.findOne({where: {Finished: false, When: {$gt: new Date().getTime() - 3600000, $lt: new Date().getTime() + 7200000} },order: [['When', 'ASC']]}).then((ele) => {
			if (ele == null) msg.reply('No current playtest.');
			var players = ele.Attendees.map((ele2) => this.client.users.get(ele2).username).join('\n');
			msg.reply({
				embed: msg.client.util.embed()
					.setTitle(`Info about the current playtest ID:${ele.id}`)
					.setColor(this.client.config.color)
					.setFooter(`In: ${this.client.helper.forHumans((ele.When - new Date())/1000)}`)
					.addField('Attendees', players.length == 0 ? 'Noone yet.' : players, true)
					.addField('Stage', ele.Stage, true)
					.setTimestamp(ele.When)
			});
		});
	}
};