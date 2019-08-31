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
		message.embed({
			color: 0xf39c12,
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
			footer: {
				text: '@KazBot',
				icon_url: process.env.AVATAR_URL,
			},
			timestamp: new Date(),
			title: 'Credit',
		});
	}
}

module.exports = CreditCommand;
