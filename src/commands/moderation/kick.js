const { Command } = require('discord.js-commando');

class KickCommmand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a specific user from the server.',
			examples: ['kick @YellowJay#5984', 'kick YellowJay'],
			guildOnly: true,
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			args: [
				{
					key: 'member',
					prompt: 'Who would you like to kick?',
					type: 'member',
				},
			],
		});
	}

	async run(message, { member }) {
		try {
			await member.kick();
			message.embed({
				color: 0xe74c3c,
				description: `Kicked ${member.displayName}`,
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Kick Command',
			});
		} catch (error) {
			message.embed({
				color: 0xe74c3c,
				description: `Failed to kick ${member.displayName}.`,
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Kick Command',
			});
		}
	}
}

module.exports = KickCommmand;
