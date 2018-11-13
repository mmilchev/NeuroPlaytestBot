const { Listener } = require('discord-akairo');

module.exports = class UserBanLogListener extends Listener {
	constructor() {
		super('guildBanAdd', {
			emitter: 'client',
            eventName: 'guildBanAdd',
            category: 'NS-Moderation'
        });
	}

	exec(guild, user) {
        if (guild.id == "465144616178679830") {
        guild.client.channels.get(guild.client.config.channels.ban).send(`-----------------------------------
[BAN] - User has been banned.
    Banned User: \`${user.username}#${user.discriminator} / ${user.id}\`
           
    At: ${new Date()}
-----------------------------------`);
        }
	}
}
