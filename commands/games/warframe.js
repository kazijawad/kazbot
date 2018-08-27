const { Command } = require('discord.js-commando');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://api.warframestat.us',
});

class WarframeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warframe',
			aliases: ['wf'],
			group: 'games',
			memberName: 'warframe',
			description: 'Provides various information on the Warframe World State',
			examples: ['wf news ps4'],
			throttling: {
				usages: 5,
				duration: 20,
			},
			guildOnly: false,
			args: [
				{
					key: 'option',
					prompt: 'What information would you like to lookup about Warframe\'s World State?',
					type: 'string',
				},
				{
					key: 'platform',
					prompt: 'What platform would you like to search on?',
					type: 'string',
					default: 'pc',
				},
			],
		});
	}

	async run(message, { option, platform }) {
		instance.get(`/${platform}`)
			.then(response => {
				const data = response['data'];
				switch (option) {
					case 'news': {
						const feed = data['news'][0];
						const newsEmbed = {
							color: 0xffd700,
							title: 'Warframe News',
							author: {
								name: 'YellowJay',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							description: feed.message,
							fields: [
								{
									name: 'ETA',
									value: feed.eta,
								},
							],
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(newsEmbed);
						break;
					}
					default: {
						message.say('Invalid warframe option!');
					}
				}
			})
			.catch(error => {
				console.error(`WARFRAME API: ${error}`);
				message.say('Failed to connect to the Warframe API!');
			});
	}
}

module.exports = WarframeCommand;
