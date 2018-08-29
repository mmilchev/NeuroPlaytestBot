let client;

function setup(cli) {
	client = cli;
}

function checkReminds() {
	client.database.REMINDS.sync().then(() => {
		client.database.REMINDS.findAll().then(res => res.forEach((elem, ind) => {
			if (elem.When - new Date() < 0) {
				client.channels.get(elem.Where).sendMessage("I'm sorry, I forgot to remind you <@!" + elem.Who + ">!\n I was late of *" + client.helper.forHumans((Date.now() - elem.When) / 1000) + "*\nReminding you of \`" + elem.What + "\`");
				client.database.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
			} else if (elem.When - new Date() < 5000) {
				setTimeout(function() { remind(client, elem.What, elem.Where, elem.Who) }, (elem.When - new Date()));
				client.database.REMINDS.destroy({where: {What: elem.What, Where: elem.Where, Who: elem.Who}});
			} 
		}));
	});
}

function remind(client, what, where, who) {
	client.channels.get(where).sendMessage("**Reminder** <@!" + who + ">!**\nThe message you want to be reminded of:\n\`\`\`\n" + what + "\n\`\`\`");
}

module.exports = {checkReminds, setup, remind };