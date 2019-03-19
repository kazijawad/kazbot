const { Command } = require('discord.js-commando');

class RoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'role',
			aliases: ['roles'],
			group: 'utilities',
			memberName: 'role',
			description: 'Retrieves role of the specified user.',
			examples: ['role', 'role @YellowJay#5984'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					prompt: 'Whose roles would you like to see?',
					type: 'member',
					default: 'undefined',
				},
			],
		});
	}

	async run(message, { member }) {
		if (member === 'undefined') { member = message.member; }
		const memberColor = member.colorRole ? member.colorRole.color : 0xff0055;
		const hoistRole = member.hoistRole ? member.hoistRole.name : 'N/A';
		const colorRole = member.colorRole ? member.colorRole.name : 'N/A';

		const roles = member.roles.map(r => r.name).join(' | ');
		const roleEmbed = {
			color: memberColor,
			title: message.guild.name,
			author: {
				name: 'KazBot',
				icon_url: process.env.AVATAR_URL,
				url: 'https://kazijawad.github.io/',
			},
			thumbnail: {
				url: message.author.avatarURL,
			},
			fields: [
				{
					name: 'Highest Role',
					value: member.highestRole.name,
					inline: true,
				},
				{
					name: 'Hoist Role',
					value: hoistRole,
					inline: true,
				},
				{
					name: 'Color Role',
					value: colorRole,
					inline: true,
				},
				{
					name: 'Roles:',
					value: roles,
					inline: true,
				},
			],
			timestamp: new Date(),
			footer: {
				text: '@KazBot',
				icon_url: message.client.user.avatarURL,
			},
		};

		message.embed(roleEmbed);
	}
}

module.exports = RoleCommand;
