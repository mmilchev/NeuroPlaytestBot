const { Command } = require('discord-akairo');

module.exports = class RemindCommand extends Command {
	constructor() {
		super('remind', {
			aliases: ['remind'],
			description: 'Reminds you about something',
			args: [{
				id: 'time' //%remind list/delete/etc
			}, {
                id: 'what',
                default: 'Placeholder'
            }]
		});
    }

    async exec (msg, {time, what}) {
        switch(time) {
            case "list":
                var reminds = await msg.client.database.REMINDS.findAll({where: {Who: msg.author.id}, order: [{'When': 'ASC'}]});
                msg.author.send(`**Your reminders:**\n\n${reminds.map((rem) => `[${rem.id}] - Reminding at **${new Date(rem.When).toString()}** of \`${rem.What}\` in channel **${msg.client.channels.get(rem.Where).name}**/**${msg.client.channels.get(rem.Where).guild.name}**`).join('\n')}`);
                msg.reply("Sent your reminders in DM.");
                break;
            case "delete":
                //TODO
                break;
            default:
                time = msg.client.parseDate(time);
                if (time === false) {
                    msg.reply(`I've been unable to parse that time/date.`);
                    break;
                }
                time = moment(time);
                msg.reply(`I'm going to remind you in **${time.fromNow()}** about \`${What}\``);
                if (time.valueOf() - new Date() > 60000) {
                    setTimeout(() => msg.client.remind.remind(this.client, what, msg.channel.id, msg.author.id));
                } else {
                    msg.client.database.REMINDS.create({
                        Where: msg.channel.id,
                        When: time,
                        What: what,
                        Who: msg.author.id
                    });
                }


        } 
    }
}