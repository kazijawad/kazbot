const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Shows the Discord Avatar for the specific user!',
	args: false,
	cooldown: 3,
	guildOnly: false,
	execute(message) {
		const avatarEmbed = new Discord.RichEmbed()
			.setTitle(message.author.username)
			.setImage(message.author.avatarURL);

		return message.channel.send({ embed: avatarEmbed });
	},
};