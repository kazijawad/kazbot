const discord = require('discord.js');

module.exports = {
	name: 'server',
	aliases: ['guild', 'server-info', 'guild-info'],
	description: 'Discord Server Information',
	cooldown: 5,
	execute(message) {
		const guildEmbed = new discord.RichEmbed()
			.setColor('AQUA')
			.setTitle(message.member.guild.name)
			.setThumbnail(message.member.guild.iconURL)
			.addField('Server Owner', message.guild.owner.displayName, true)
			.addField('Total Members', message.guild.memberCount, true)
			.addField('Server Region', message.guild.region, true)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.channel.send({ embed: guildEmbed });
	},
};