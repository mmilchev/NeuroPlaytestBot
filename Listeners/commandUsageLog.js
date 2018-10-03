const { Listener } = require('discord-akairo');

module.exports = class CommandHandlerCommandStartedListener extends Listener {
	constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			eventName: 'commandStarted',
			category: 'Commands'
		});
	}

	exec(msg, command) {
		var chan = msg.client.channels.get(msg.client.config.channels.log);
		if (chan == undefined) {
			msg.reply("Log Channel not found. Please change values in the config.json in order to restore functionallity. Stopping Bot.")
			throw("Log Channel not found. Please change values in the config.json in order to restore functionallity. Stopping Bot.");
		}
		
		chan.send(`-----------------------------------
[CMD] - Issued Command: ${command.id}
     Issued by: \`${msg.author.username}#${msg.author.discriminator} / ${msg.author.id}\`
     On: \`${msg.guild === null ? msg.channel.recipient : msg.guild.name}/${msg.channel.name}\`
           
    At: ${new Date()}
-----------------------------------`);
	}
};
