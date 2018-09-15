const { Command } = require('discord-akairo');

module.exports = class TalkCommand extends Command {
	constructor() {
		super('talk', {
			aliases: ['talk'],
			description: 'Repeats the text.',
			ownerOnly: true,
			args: [
				{
					id: 'message',
					match: 'content'
				}
			]
		});
	}

	/**
	 * Sends the second parameter in the message object channel.
	 * @param {Discord.JS Message} msg A message object
	 * @param {{string}} param1 An object with message: <string> keypair
	 */
	exec(msg, { message }) {
		msg.channel.send(message);
	}
};
