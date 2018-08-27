const { Command } = require('discord.js-commando');

class CreditCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'credit',
			aliases: ['source'],
			group: 'misc',
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
				name: 'YellowJay',
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
					name: 'Battlerite API',
					value: 'https://developer.battlerite.com',
				},
				{
					name: 'Overwatch API Wrapper',
					value: 'https://github.com/gclem/overwatch-js',
				},
				{
					name: 'League of Legends API',
					value: 'https://developer.riotgames.com/api-methods',
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
