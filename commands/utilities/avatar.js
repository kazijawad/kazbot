const { Command } = require('discord.js-commando');

class AvatarCommand extends Command {
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
					default: 'undefined',
				},
			],
		});
	}

	async run(message, { user }) {
		if (user === 'undefined') { user = message.author; }

		const avatarEmbed = {
			title: `${user.username}'s Avatar`,
			author: {
				name: 'YellowJay',
				icon_url: process.env.AVATAR_URL,
				url: 'https://kazijawad.github.io/',
			},
			image: {
				url: user.avatarURL,
			},
			timestamp: new Date(),
			footer: {
				text: '@KazBot',
				icon_url: message.client.user.avatarURL,
			},
		};

		message.embed(avatarEmbed);
	}
}

module.exports = AvatarCommand;
