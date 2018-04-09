const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class RoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'role',
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
		if (member === 'undefined') {
			member = message.member;
		}

		const roles = member.roles.map(r => r.name).join(' | ');
		const roleEmbed = new RichEmbed()
			.setColor(member.hoistRole.color)
			.setTitle(message.guild.name)
			.addField('Highest Role', member.highestRole.name, true)
			.addField('Hoist Role', member.hoistRole.name, true)
			.addField('Roles:', roles)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.embed(roleEmbed);
	}
};