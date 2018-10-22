const { Listener } = require('discord-akairo');

const test = new RegExp('(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]');
const test2 = new RegExp('(https?:\/\/)?(www\.)?(twitter.\.(com)\/.+[a-z]');


module.exports = class MessageListener extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			eventName: 'message',
			category: 'NS-Moderation'
		});
	}

	exec(msg) {
        if (member.guild.id == "151537960406220800") {
            if (test.test(msg.content) || test2.test(msg.content)) {
                msg.delete();
            }
        }
	}
};
