const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
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
		const userEmbed = new RichEmbed()
			.setColor(message.member.roles.color)
			.setTitle(message.member.displayName)
			.setThumbnail(message.author.avatarURL)
			.addField('Discord ID', message.author.id, true)
			.addField('Discord Tag', message.author.tag, true)
			.addField('Role Name', message.member.highestRole.name, true)
			.addField('Role Position', message.member.highestRole.position, true)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.embed(userEmbed);
	}
};