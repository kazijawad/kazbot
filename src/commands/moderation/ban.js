const { Command } = require('discord.js-commando');

class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans a specific user from the server.',
			examples: ['ban @YellowJay#5984', 'ban YellowJay'],
			guildOnly: true,
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			args: [
				{
					key: 'member',
					prompt: 'Who would you like to ban?',
					type: 'member',
				},
				{
					key: 'reason',
					prompt: 'Please state the reason for banning this member.',
					type: 'string',
					default: undefined,
				},
				{
					key: 'days',
					prompt: 'How many days of messages would you like to delete for this member?',
					type: 'integer',
					default: 10,
				},
			],
		});
	}

	async run(message, { member, reason, days }) {
		member.ban({ reason: reason, days: days })
			.then(() => message.say(`Banned ${member.displayName}`))
			.catch(() => message.say(`Failed to ban ${member.displayName}.`));
	}
}

module.exports = BanCommand;
