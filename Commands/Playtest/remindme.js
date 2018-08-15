const { Command } = require('discord-akairo');

module.exports = class RemindmeCommand extends Command {
	constructor() {
		super('remindme', {
			aliases: ['remindme', 'rm'],
			description: 'Reminds you 30 minutes before the playtest.',
			args: [{
				id: 'playtestid',
				match: 'content',
				default: 'upcoming'
			}]
		});
    }
    
    async exec(msg, {playtestid}) { /*
        if (playtestid == "upcoming") var query = {where: {Finished: false },order: [['When', 'DESC']]};
        else var query = {where: {id: parseInt(playtestid)}}
        var playtest = await msg.client.database.PLAYTESTS.findOne(query);
        this.client.database.REMINDS.create({
            Where: msg.channel.id,
            When: playtest.When - 1800000,
            What: `Playtest ${playtest.id} is about to begin in 30 minutes!`,
            Who: msg.author.id
        });
        msg.reply("You are going to be notified in 30 minutes before the playtest.");*/
    }
}