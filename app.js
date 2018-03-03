process.env.LEAGUE_API_PLATFORM_ID = 'na1';
require('dotenv').config();

const { prefix } = require('./config.json');
const discord = require('discord.js');
const fortnite = require('fortnite-api');
const overwatch = require('overwatch-js');
const league = require('leaguejs');

const token = process.env.token;
const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const leagueAPIKey = process.env.leagueAPIKey;

const client = new discord.Client();
const fortniteAPI = new fortnite(fortniteAPIKey);
const leagueAPI = new league(leagueAPIKey);

client.on('ready', function() {
	console.log('Logged in as ' + client.user.tag + '!');
});

client.on('message', function(message) {
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	else if (command === 'ping') {
		message.channel.send('Pong!');
	}
	else if (command === 'help') {
		message.channel.send({ embed: {
			color: 12370112,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL,
			},
			title: 'Commands',
			fields: [{
				name: 'Command List',
				value: '!help',
			},
			{
				name: 'User Info',
				value: '!me',
			},
			{
				name: 'Fortnite Player Stats:',
				value: '!fort [FORTNITE USERNAME]',
			},
			{
				name: 'Fortnite Server Status:',
				value: '!fortstatus',
			},
			{
				name: 'Fortnite News:',
				value: '!fortnews',
			},
			{
				name: 'Overwatch Player Stats:',
				value: '!ow [USERNAME-TAG]',
			},
			{
				name: 'League of Legends Player Stats:',
				value: '!lol [SUMMONER NAME]',
			},
			{
				name: 'Credits:',
				value: '!credit',
			}],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©Game-Tracker',
			},
		} });
	}
	else if (command === 'me' && args[0] === undefined) {
		message.channel.send({ embed: {
			color: message.member.roles.color,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL,
			},
			title: message.member.displayName + '\'s Info',
			thumbnail: {
				url: message.author.avatarURL,
			},
			fields: [{
				name: 'Discord ID',
				value: message.author.id,
				inline: true,
			},
			{
				name: 'Discord Tag',
				value: message.author.tag,
				inline: true,
			},
			{
				name: 'Role Name',
				value: message.member.highestRole.name,
				inline: true,
			},
			{
				name: 'Role Position',
				value: message.member.highestRole.position,
				inline: true,
			}],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '@Game-Tracker',
			},
		} });
	}
	else if (command === 'server' && args[0] === undefined) {
		message.channel.send({ embed: {
			color: 1752220,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL,
			},
			title: message.member.guild.name + '\'s Info',
			thumbnail: {
				url: message.member.guild.iconURL,
			},
			fields: [{
				name: 'Server Owner',
				value: message.member.guild.owner.displayName,
				inline: true,
			},
			{
				name: 'Total Members',
				value: message.member.guild.memberCount,
				inline: true,
			}],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '@Game-Tracker',
			},
		} });
	}
	else if (command === 'fort' && args[0] != undefined) {
		fortniteAPI.login().then(() => {
			fortniteAPI.getStatsBR(args[0], 'pc')
				.then((stats) => {
					message.channel.send({ embed: {
						color: 10181046,
						author: {
							name: client.user.username,
							icon_url: client.user.avatarURL,
						},
						title: stats['info']['username'] + '\'s Fortnite Stats',
						fields: [{
							name: 'Total Wins:',
							value: stats['lifetimeStats']['wins'],
						},
						{
							name: 'Total Kills:',
							value: stats['lifetimeStats']['kills'],
						},
						{
							name: 'Total Matches:',
							value: stats['lifetimeStats']['matches'],
						},
						{
							name: 'Total Playtime:',
							value: stats['lifetimeStats']['timePlayed'],
						}],
						timestamp: new Date(),
						footer: {
							icon_url: client.user.avatarURL,
							text: '©Game-Tracker',
						},
					} });
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
	else if (command === 'fortstatus') {
		fortniteAPI.login().then(() => {
			fortniteAPI.checkFortniteStatus()
				.then((status) => {
					if (status === true) {
						message.channel.send('Fortnite is Online!');
					}
					else if (status === false) {
						message.channel.send('Fortnite is Down!' + '\n' + 'Check: https://twitter.com/FortniteGame');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
	else if (command === 'fortnews') {
		fortniteAPI.login().then(() => {
			fortniteAPI.getFortniteNews('en')
				.then((news) => {
					message.channel.send({ embed: {
						color: 7419530,
						author: {
							name: client.user.username,
							icon_url: client.user.avatarURL,
						},
						title: 'Fortnite News',
						fields: [{
							name: news['loginmessage']['title'],
							value: news['loginmessage']['body'],
						}],
						footer: {
							icon_url: client.user.avatarURL,
							text: '©Game-Tracker',
						},
					} });
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
	else if (command === 'ow' && args[0] != undefined) {
		overwatch.getOverall('pc', 'us', args[0])
			.then((stats) => {
				message.channel.send({ embed: {
					color: 3447003,
					author: {
						name: client.user.username,
						icon_url: client.user.avatarURL,
					},
					title: stats['profile']['nick'] + '\'s Competitve Overwatch Stats',
					thumbnail: {
						url: stats['profile']['avatar'],
					},
					fields: [{
						name: 'Level:',
						value: stats['profile']['level'],
					},
					{
						name: 'Rank:',
						value: stats['profile']['ranking'] + ' | ' + stats['profile']['rank'],
					},
					{
						name: 'Total Wins:',
						value: stats['competitive']['global']['games_won'],
					},
					{
						name: 'Total Kills:',
						value: stats['competitive']['global']['eliminations'],
					},
					{
						name: 'Total Deaths:',
						value: stats['competitive']['global']['deaths'],
					},
					{
						name: 'Best MultiKill:',
						value: stats['competitive']['global']['multikill_best'],
					},
					{
						name: 'Most Gold Medals:',
						value: stats['competitive']['global']['medals_gold'],
					},
					{
						name: 'Total Playtime:',
						value: stats['competitive']['global']['time_played'],
					}],
					timestamp: new Date(),
					footer: {
						icon_url: client.user.avatarURL,
						text: '©Game-Tracker',
					},
				} });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	else if (command === 'lol' && args[0] != undefined) {
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
								message.channel.send({ embed: {
									color: 15158332,
									author: {
										name: client.user.username,
										icon_url: client.user.avatarURL,
									},
									title: stats[0]['playerOrTeamName'] + '\'s LoL Stats',
									thumbnail: {
										url: 'http://ddragon.leagueoflegends.com/cdn/8.4.1/img/profileicon/' + profileIcon,
									},
									fields: [{
										name: 'Level:',
										value: data['summonerLevel'],
									},
									{
										name: 'Tier:',
										value: stats[0]['tier'],
									},
									{
										name: 'Rank:',
										value: stats[0]['rank'],
									},
									{
										name: 'Queue Type:',
										value: stats[0]['queueType'],
									},
									{
										name: 'Total Wins:',
										value: stats[0]['wins'],
									},
									{
										name: 'Total Losses:',
										value: stats[0]['losses'],
									}],
									timestamp: new Date(),
									footer: {
										icon_url: client.user.avatarURL,
										text: '©Game-Tracker',
									},
								} });
							});
					});
			})
			.catch(err => {
				'use strict';
				console.log(err);
			});
	}
	else if (command === 'credit') {
		message.channel.send({ embed: {
			color: 15844367,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL,
			},
			title: 'Credit',
			fields: [{
				name: 'Discord.js',
				value: 'https://discord.js.org/#/',
			},
			{
				name: 'Fortnite API',
				value: 'https://github.com/qlaffont/fortnite-api',
			},
			{
				name: 'Overwatch API',
				value: 'https://github.com/gclem/overwatch-js',
			},
			{
				name: 'League of Legends API',
				value: 'https://developer.riotgames.com/api-methods/' + '\n' + 'https://github.com/Colorfulstan/LeagueJS',
			},
			{
				name: 'Discord Bot Icon',
				value: 'Icon made by Plainicon from www.flaticon.com is licensed by CC 3.0 BY',
			}],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: '©Game-Tracker',
			},
		} });
	}
});

client.login(token);