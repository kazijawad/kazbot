const { Command } = require('discord.js-commando');

class ServerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server',
			aliases: ['guild'],
			group: 'utilities',
			memberName: 'server',
			description: 'Retrieves Server Information.',
			examples: ['server'],
			guildOnly: true,
		});
	}

	async run(message) {
		const afkChannel = message.guild.afkChannel ? message.guild.afkChannel.name : 'N/A';

		const guildEmbed = {
			color: 0xb8860b,
			title: message.guild.name,
			author: {
				name: 'KazBot',
				icon_url: process.env.AVATAR_URL,
				url: 'https://kazijawad.github.io/',
			},
			thumbnail: {
				url: message.guild.iconURL,
			},
			fields: [
				{
					name: 'Guild ID',
					value: message.guild.id,
					inline: true,
				},
				{
					name: 'Guild Owner',
					value: message.guild.owner.displayName,
					inline: true,
				},
				{
					name: 'Guild Region',
					value: message.guild.region,
					inline: true,
				},
				{
					name: 'Member Count',
					value: message.guild.memberCount,
					inline: true,
				},
				{
					name: 'Default Role',
					value: message.guild.defaultRole.name,
					inline: true,
				},
				{
					name: 'AFK Channel',
					value: afkChannel,
					inline: true,
				},
				{
					name: 'Creation',
					value: message.guild.createdAt,
					inline: true,
				},
			],
			timestamp: new Date(),
			footer: {
				text: '@KazBot',
				icon_url: message.client.user.avatarURL,
			},
		};

		message.embed(guildEmbed);
	}
}

module.exports = ServerCommand;
