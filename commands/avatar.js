const discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Shows the Discord Avatar for the specific user!',
	cooldown: 5,
	execute(message) {
		const avatarEmbed = new discord.RichEmbed()
			.setImage(message.author.avatarURL);

		return message.reply({ embed: avatarEmbed });
	},
};