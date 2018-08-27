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
		const userEmbed = {
			color: message.member.roles.color,
			title: message.member.displayName,
			author: {
				name: 'YellowJay',
				icon_url: process.env.AVATAR_URL,
				url: 'https://kazijawad.github.io/',
			},
			thumbnail: {
				url: message.author.avatarURL,
			},
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
			timestamp: new Date(),
			footer: {
				text: '@KazBot',
				icon_url: message.client.user.avatarURL,
			},
		};

		message.embed(userEmbed);
	}
}

module.exports = UserCommand;
