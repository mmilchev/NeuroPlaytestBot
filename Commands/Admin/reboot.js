const { Command } = require('discord-akairo');

module.exports = class RebootCommand extends Command {
	constructor() {
		super('reboot', {
			aliases: ['reboot'],
			description: 'Reboots the bot.',
			ownerOnly: true,
			protected: true
		});
	}

	/**
	 * Reboots the bot. Uses PM2 for auto-restart.
	 * @param {Discord.JS Message} msg A message object
	 */
	exec(msg) {
		msg.reply('Rebooting.').then(() => {
			console.log(`Rebooting at ${new Date()}`);
			process.exit(0);
		});
	}
};
