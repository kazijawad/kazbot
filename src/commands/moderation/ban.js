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
		try {
			await member.ban({ reason: reason, days: days });
			message.embed({
				color: 0xe74c3c,
				description: `Banned ${member.displayName}`,
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Ban Command',
			});
		} catch (error) {
			message.embed({
				color: 0xe74c3c,
				description: `Failed to ban ${member.displayName}.`,
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Ban Command',
			});
		}
	}
}

module.exports = BanCommand;
