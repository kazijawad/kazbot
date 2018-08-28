const { Command } = require('discord.js-commando');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://api.developer.battlerite.com/shards/global',
	headers: {
		'Authorization': `Bearer ${process.env.BATTLERITE_API}`,
		'Accept': 'application/vnd.api+json',
	},
});

class BattleriteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'battlerite',
			aliases: ['br'],
			group: 'games',
			memberName: 'battlerite',
			description: 'Shows Battlerite player stats for the specified player.',
			examples: ['br TimmehHD'],
			throttling: {
				usages: 2,
				duration: 10,
			},
			guildOnly: false,
			args: [
				{
					key: 'username',
					prompt: 'Which Battlerite player would you like to lookup?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { username }) {
		instance.get(`/players?filter[playerNames]=${username}`)
			.then(response => {
				if (!response['data']['data'][0]['attributes']['stats']['2']) {
					return message.say('Failed to retrieve Battlerite player!');
				}
				const data = response['data']['data'][0]['attributes'];

				const battleriteEmbed = {
					color: 0xe67e22,
					title: `${data['name']}'s Battlerite Stats`,
					author: {
						name: 'KazBot',
						icon_url: process.env.AVATAR_URL,
						url: 'https://kazijawad.github.io/',
					},
					fields: [
						{
							name: 'Total Matches',
							value: data['stats']['2'] + data['stats']['3'],
							inline: true,
						},
						{
							name: 'Total Wins',
							value: data['stats']['2'],
							inline: true,
						},
						{
							name: 'Total Losses',
							value: data['stats']['3'],
							inline: true,
						},
						{
							name: 'League 2v2',
							value: `${data['stats']['14']}-${data['stats']['15']}`,
							inline: true,
						},
						{
							name: 'League 3v3',
							value: `${data['stats']['16']}-${data['stats']['17']}`,
							inline: true,
						},
						{
							name: 'Quickmatch 2v2',
							value: `${data['stats']['10']}-${data['stats']['11']}`,
							inline: true,
						},
						{
							name: 'Quickmatch 3v3',
							value: `${data['stats']['12']}-${data['stats']['13']}`,
							inline: true,
						},
					],
					timestamp: new Date(),
					footer: {
						text: '@KazBot',
						icon_url: message.client.user.avatarURL,
					},
				};

				message.embed(battleriteEmbed);
			})
			.catch(error => {
				console.error(`BATTLERITE API: ${error}`);
				message.say('Failed to access Battlerite!');
			});
	}
}

module.exports = BattleriteCommand;
