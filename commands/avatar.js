const discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Shows the Discord Avatar for the specific user!',
	args: false,
	cooldown: 5,
	execute(message) {
		const avatarEmbed = new discord.RichEmbed()
			.setTitle(message.author.username)
			.setImage(message.author.avatarURL);

		return message.channel.send({ embed: avatarEmbed });
	},
};