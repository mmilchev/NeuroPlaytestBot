let client;

/**
 * Initialization of the remind module
 * @param {Discord.JS Client} cli Discord.JS Client
 */
function setup(cli) {
	client = cli;
}
/**
 * A loop to start checking the reminds in the database.
 */
function checkReminds() {
	client.database.REMINDS.sync().then(() => {
		client.database.REMINDS.findAll().then(res => res.forEach((elem) => {
			if (elem.When - new Date() < 0) {
				client.channels.get(elem.Where).sendMessage(`I'm sorry, I forgot to remind you <@!${elem.Who}>!\n I was late of *${client.helper.forHumans((Date.now() - elem.When) / 1000)}*\nReminding you of \`${elem.What}\``);
				client.database.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
			} else if (elem.When - new Date() < 5000) {
				if (elem.What.startsWith('[PT]')) {
					client.database.PLAYTESTS.findOne({where: {Finished: false },order: [['When', 'DESC']]}).then(res => {
						setTimeout(() => { client.channels.get(elem.Where).send(client.channels.get(elem.Where).send(`Playtest is about to begin!\n${res.Attendees.map(e => `<@!${e}>`).join(' ')}`))}, 5000);
						return client.database.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
					});
				} else {
					setTimeout(function() { remind(client, elem.What, elem.Where, elem.Who); }, (elem.When - new Date()));
					client.database.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
				}
			} 
		}));
	});
}

/**
 * 
 * @param {Discord.JS Client} client 
 * @param {string} what 
 * @param {ChannelID} where 
 * @param {UserID} who 
 */
function remind(client, what, where, who) {
	client.channels.get(where).sendMessage(`**Reminder** <@!${who}>!**\nThe message you want to be reminded of:\n\`\`\`\n${what}\n\`\`\``);
}

module.exports = {checkReminds, setup, remind };
