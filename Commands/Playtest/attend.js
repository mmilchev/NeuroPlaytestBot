const {
    Command
} = require('discord-akairo');

module.exports = class AttendCommand extends Command {
    constructor() {
        super('attend', {
            aliases: ['attend'],
            description: 'Marks you as attending for the upcoming playtest',
            args: [{
                id: 'playtestid',
                match: 'content',
                default: "upcoming"
            }]
        });
    }

    exec(msg, {playtestid}) {
        if (playtestid == "upcoming") playtestid = {where: {Finished: false },order: [['When', 'ASC']]};
        else playtestid = {where: {Finished: false, id: playtestid }};
        this.client.database.PLAYTESTS.findOne(playtestid).then((ele) => {
            console.log(ele);
            if (ele.Attendees.indexOf(msg.author.id) !== -1) msg.reply('You are already attending the playtest.');
            ele.update({
                Attendees: ele.Attendees.push(msg.author.id)
            }).then((e) => {
                msg.reply(`You successfully marked yourself as attending for the upcoming playtest.
The playtest will be at **${ele.When.toString()}**
Approximately in **${this.client.helper.forHumans(ele.When - new Date())}**
`)
            })
        });
    }
}