const discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon'],
	description: 'Shows the Discord Avatar for the specific user!',
	args: true,
	cooldown: 5,
	usage: '[Discord Name]',
	execute(message, args) {
		const avatarEmbed = new discord.RichEmbed()
			.setImage(message.author.avatarURL);

		if (args[0] === 'me') {
			message.reply({ embed: avatarEmbed });
		}
		else {
			message.reply('Invalid argument!');
		}
	},
};