process.env.LEAGUE_API_PLATFORM_ID = 'na1';

const discord = require('discord.js');
const league = require('leaguejs');

const leagueAPIKey = process.env.leagueAPIKey;
const leagueAPI = new league(leagueAPIKey);

module.exports = {
	name: 'lol',
	aliases: ['league'],
	description: 'Shows all LoL Player Stats',
	args: true,
	usage: '[SUMMONER-NAME]',
	cooldown: 30,
	guildOnly: false,
	execute(message, args) {
		leagueAPI.Summoner.gettingByName(args[0])
			.then(data => {
				'use strict';
				const id = data['id'];
				const profileID = data['profileIconId'];
				leagueAPI.League.gettingPositionsForSummonerId(id)
					.then(stats => {
						leagueAPI.StaticData.gettingProfileIcons()
							.then(icons => {
								const profileIcon = icons['data'][profileID]['image']['full'];
								const lolEmbed = new discord.RichEmbed()
									.setColor('RED')
									.setTitle(stats[0]['playerOrTeamName'] + '\'s LoL Stats')
									.setThumbnail('http://ddragon.leagueoflegends.com/cdn/8.4.1/img/profileicon/' + profileIcon)
									.addField('Level', data['summonerLevel'], true)
									.addField('Tier', stats[0]['tier'], true)
									.addField('Rank', stats[0]['rank'], true)
									.addField('Queue Type', stats[0]['queueType'], true)
									.addField('Total Wins', stats[0]['wins'], true)
									.addField('Total Losses', stats[0]['losses'], true)
									.setTimestamp(new Date())
									.setFooter('@Kaz-Bot');
								return message.channel.send({ embed: lolEmbed });
							})
							.catch(err => {
								console.log(err);
								return message.channel.send('Unable to retrieve Lol Stats!');
							});
					})
					.catch(err => {
						console.log(err);
						return message.channel.send('Unable to retrieve Lol Stats!');
					});
			})
			.catch(err => {
				'use strict';
				console.log(err);
				return message.channel.send('Unable to retrieve Lol Stats!');
			});
	},
};