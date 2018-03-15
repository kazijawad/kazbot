const discord = require('discord.js');

module.exports = {
	name: 'user',
	aliases: ['me', 'user-info'],
	description: 'Discord User Information',
	args: false,
	cooldown: 5,
	guildOnly: true,
	execute(message) {
		const userEmbed = new discord.RichEmbed()
			.setColor(message.member.roles.color)
			.setTitle(message.member.displayName)
			.setThumbnail(message.author.avatarURL)
			.addField('Discord ID', message.author.id, true)
			.addField('Discord Tag', message.author.tag, true)
			.addBlankField()
			.addField('Role Name', message.member.highestRole.name, true)
			.addField('Role Position', message.member.highestRole.position, true)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		return message.channel.send({ embed: userEmbed });
	},
};