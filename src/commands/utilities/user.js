const { Command } = require('discord.js-commando');

class UserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'user',
			aliases: ['member', 'me'],
			group: 'utilities',
			memberName: 'user',
			description: 'Retrieves User Information.',
			examples: ['user'],
			guildOnly: true,
		});
	}

	async run(message) {
		message.embed({
			color: 0xf39c12,
			fields: [
				{
					name: 'Discord ID',
					value: message.author.id,
					inline: true,
				},
				{
					name: 'Discord Tag',
					value: message.author.tag,
					inline: true,
				},
				{
					name: 'Role Name',
					value: message.member.highestRole.name,
					inline: true,
				},
				{
					name: 'Role Position',
					value: message.member.highestRole.position,
					inline: true,
				},
			],
			footer: {
				text: '@KazBot',
				icon_url: process.env.AVATAR_URL,
			},
			timestamp: new Date(),
			title: `${message.member.displayName}'s Information`,
		});
	}
}

module.exports = UserCommand;
