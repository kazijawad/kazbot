const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class LeagueEmbed extends Command {
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
		const summonerName = {
			url: `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}`,
			headers: {
				'Origin': 'https://developer.riotgames.com',
				'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Riot-Token': process.env.LEAGUE_API,
				'Accept-Language': 'en-US,en;q=0.9',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			},
		};

		request(summonerName, (err, resOne, body) => {
			if (err) {
				console.error(err);
				return message.say('Failed to retrieve Summoner!');
			}

			const info = JSON.parse(body);
			const id = info.id;
			const summonerID = {
				url: `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/${id}`,
				headers: {
					'Origin': 'https://developer.riotgames.com',
					'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Riot-Token': process.env.LEAGUE_API,
					'Accept-Language': 'en-US,en;q=0.9',
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				},
			};

			request(summonerID, (error, resTwo, data) => {
				if (error) throw err;
				const stats = JSON.parse(data);
				if (!stats[0]) return message.say('Failed to retrieve Summoner!');

				const lolEmbed = new RichEmbed()
					.setColor('RED')
					.setTitle(stats[0]['playerOrTeamName'] + '\'s LoL Stats')
					.addField('Level', info['summonerLevel'], true)
					.addField('Tier', stats[0]['tier'], true)
					.addField('Rank', stats[0]['rank'], true)
					.addField('Queue Type', stats[0]['queueType'], true)
					.addField('Total Wins', stats[0]['wins'], true)
					.addField('Total Losses', stats[0]['losses'], true)
					.setTimestamp(new Date())
					.setFooter('@Kaz-Bot');
				message.embed(lolEmbed);
			});
		});
	}
};
