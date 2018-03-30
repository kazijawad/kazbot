process.env.LEAGUE_API_PLATFORM_ID = 'na1';

const Discord = require('discord.js');
const League = require('leaguejs');

const leagueAPIKey = process.env.leagueAPIKey;
const leagueAPI = new League(leagueAPIKey);

module.exports = {
	name: 'league',
	aliases: ['lol'],
	description: 'Shows all LoL Player Stats',
	args: true,
	usage: '[summoner-name]',
	example: 'MaximumTilt',
	cooldown: 20,
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
								const lolEmbed = new Discord.RichEmbed()
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
								return message.channel.send('Unable to retrieve Summoner Stats!');
							});
					})
					.catch(err => {
						console.log(err);
						return message.channel.send('Unable to retrieve Summoner ID!');
					});
			})
			.catch(err => {
				'use strict';
				console.log(err);
				return message.channel.send('Unable to retrieve Summoner!');
			});
	},
};