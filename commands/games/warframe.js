const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class WarframeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warframe',
			aliases: ['wf'],
			group: 'games',
			memberName: 'warframe',
			description: 'Provides various information on the Warframe World State',
			examples: ['wf sortie', 'wf news ps4', 'wf alerts xb1'],
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
		const params = {
			url: `https://api.warframestat.us/${platform}`,
		};

		request(params, (err, res, body) => {
			if (err) {
				console.log(err);
				return message.say('Failed to connect to the Warframe API!');
			}
			const feed = JSON.parse(body);

			switch (option) {
				case 'news': {
					const info = feed.news[feed.news.length - 1];

					const newsEmbed = new RichEmbed()
						.setColor('GOLD')
						.setTitle('Warframe News')
						.setDescription(info.message)
						.addField('ETA', info.eta)
						.setFooter('@Kaz-Bot')
						.setTimestamp(new Date());

					message.embed(newsEmbed);
					break;
				}
				default: {
					message.say('Invalid warframe option!');
				}
					break;
			}
		});
	}
};