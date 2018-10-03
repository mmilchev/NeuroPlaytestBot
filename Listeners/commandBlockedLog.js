const { Listener } = require('discord-akairo');

module.exports = class CommandHandlerCommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			eventName: 'commandBlocked',
			category: 'Commands'
		});
	}

	exec(msg, command, reason) {
		var chan = msg.client.channels.get(msg.client.config.channels.blocked);
		if (chan == undefined) {
			msg.reply("Blocked Log Channel not found. Please change values in the config.json in order to restore functionallity. Stopping Bot.")
			throw("Blocked Log Channel not found. Please change values in the config.json in order to restore functionallity. Stopping Bot.");
		}
		
		chan.send(`-----------------------------------
[BLOCK] - Command: ${command.id} was blocked.
    Issed by: \`${msg.author.username}#${msg.author.discriminator} / ${msg.author.id}\`
     On: \`${msg.guild === null ? msg.channel.recipient : msg.guild.name}/${msg.channel.name}\`
     Reason:${reason}
            
    At: ${new Date()}
-----------------------------------`);
	}
};
