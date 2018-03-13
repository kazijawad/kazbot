const discord = require('discord.js');

module.exports = {
	name: 'roles',
	description: 'Shows all the roles on the server!',
	args: false,
	cooldown: 3,
	guildOnly: true,
	execute(message) {
		const roles = message.guild.roles.map(r => r.name).join('\n');
		const roleEmbed = new discord.RichEmbed()
			.setColor('ORANGE')
			.setTitle(message.guild.name)
			.addField('Roles:', roles)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.channel.send({ embed: roleEmbed });
	},
};