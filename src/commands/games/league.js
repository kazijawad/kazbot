const { Command } = require('discord.js-commando');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://na1.api.riotgames.com/lol',
	headers: {
		'Origin': 'https://developer.riotgames.com',
		'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
		'X-Riot-Token': process.env.LEAGUE_API,
		'Accept-Language': 'en-US,en;q=0.9',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
	},
});

class LeagueEmbed extends Command {
	constructor(client) {
		super(client, {
			name: 'league',
			aliases: ['lol'],
			group: 'games',
			memberName: 'league',
			description: 'Shows League of Legends summoner stats for the specified player.',
			examples: ['lol MaximumTilt'],
			throttling: {
				usages: 2,
				duration: 20,
			},
			guildOnly: false,
			args: [
				{
					key: 'summoner',
					prompt: 'Which Summoner would you like to lookup?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { summoner }) {
		try {
			const response = await instance.get(`/summoner/v4/summoners/by-name/${summoner}`);
			const ID = response['data']['id'];

			try {
				const player = await instance.get(`/league/v4/positions/by-summoner/${ID}`);
				const lolEmbed = {
					color: 0xd63031,
					title: `${player['data'][0]['summonerName']}'s LoL Stats`,
					author: {
						name: 'KazBot',
						icon_url: process.env.AVATAR_URL,
						url: 'https://kazijawad.github.io/',
					},
					fields: [
						{
							name: 'League Name',
							value: player['data'][0]['leagueName'],
							inline: true,
						},
						{
							name: 'League Points',
							value: player['data'][0]['leaguePoints'],
							inline: true,
						},
						{
							name: 'Tier',
							value: player['data'][0]['tier'],
							inline: true,
						},
						{
							name: 'Rank',
							value: player['data'][0]['rank'],
							inline: true,
						},
						{
							name: 'Queue Type',
							value: player['data'][0]['queueType'],
							inline: true,
						},
						{
							name: 'Total Wins',
							value: player['data'][0]['wins'],
							inline: true,
						},
						{
							name: 'Total Losses',
							value: player['data'][0]['losses'],
							inline: true,
						},
					],
					timestamp: new Date(),
					footer: {
						text: '@KazBot',
						icon_url: message.client.user.avatarURL,
					},
				};
				message.embed(lolEmbed);
			} catch (error) {
				console.error(`LEAGUE API ${error.message}`);
				message.say('Failed to retrieve Summoner ID.');
			}
		} catch (error) {
			console.error(`LEAGUE API ${error.message}`);
			message.say('Failed to retrieve Summoner name.');
		}
	}
}

module.exports = LeagueEmbed;
