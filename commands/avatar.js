const discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Shows the Discord Avatar for the specific user!',
	cooldown: 5,
	execute(message, args) {
		if (args.length) {
			return message.reply('There are no arguments for the avatar command!');
		}
		const avatarEmbed = new discord.RichEmbed()
			.setTitle(message.author.username)
			.setImage(message.author.avatarURL);

		return message.channel.send({ embed: avatarEmbed });
	},
};