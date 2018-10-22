const { Listener } = require('discord-akairo');

const test = new RegExp('(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]');
const test2 = new RegExp('(https?:\/\/)?(www\.)?(twitter.\.(com))\/.+[a-z]');


module.exports = class GuildMemberAddListener extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
			eventName: 'guildMemberAdd',
			category: 'NS-Moderation'
		});
	}

	exec(member) {
        if (member.guild.id == "151537960406220800") {
            if (test.test(member.user.username) || test2.test(member.user.username)) {
                member.ban();
            }
        }
	}
};
