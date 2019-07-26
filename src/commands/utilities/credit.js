const { Command } = require('discord.js-commando');

class CreditCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'credit',
			aliases: ['source'],
			group: 'utilities',
			memberName: 'credit',
			description: 'Credit to KazBot\'s Resources.',
			examples: ['credit'],
			guildOnly: false,
		});
	}

	async run(message) {
		const creditEmbed = {
			color: 0xffd700,
			title: 'Credit',
			author: {
				name: 'KazBot',
				icon_url: process.env.AVATAR_URL,
				url: 'https://kazijawad.github.io/',
			},
			thumbnail: {
				url: message.client.user.avatarURL,
			},
			fields: [
				{
					name: 'Discord.js',
					value: 'https://discord.js.org/#/',
				},
				{
					name: 'Fortnite API Wrapper',
					value: 'https://github.com/qlaffont/fortnite-api',
				},
				{
					name: 'CoinMarketCap API',
					value: 'https://coinmarketcap.com/api',
				},
				{
					name: 'Youtube Download Module',
					value: 'https://github.com/fent/node-ytdl-core',
				},
				{
					name: 'Github Repository',
					value: 'https://github.com/kazijawad/KazBot',
				},
				{
					name: 'Website',
					value: 'https://kazbot.js.org/',
				},
			],
			timestamp: new Date(),
			footer: {
				text: '@KazBot',
				icon_url: message.client.user.avatarURL,
			},
		};

		message.embed(creditEmbed);
	}
}

module.exports = CreditCommand;
