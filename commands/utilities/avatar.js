const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			aliases: ['icon'],
			group: 'utilities',
			memberName: 'avatar',
			description: 'Retrieves Discord Avatar for the specificed User.',
			examples: ['avatar @YellowJay#5984'],
			guildOnly: false,
			args: [
				{
					key: 'user',
					prompt: 'What user avatar would you like to see?',
					type: 'user',
				},
			],
		});
	}

	async run(message, { user }) {
		const avatarEmbed = new RichEmbed()
			.setTitle(user.username)
			.setImage(user.avatarURL);

		message.embed(avatarEmbed);
	}
};