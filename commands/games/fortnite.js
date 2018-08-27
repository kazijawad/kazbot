const { Command } = require('discord.js-commando');
const Fortnite = require('fortnite-api');

const fortniteAPI = [
	process.env.FORTNITE_EMAIL,
	process.env.FORTNITE_PASS,
	process.env.FORTNITE_LAUNCH,
	process.env.FORTNITE_CLIENT,
];
const fortnite = new Fortnite(fortniteAPI, { debug: true });

class FortniteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fortnite',
			aliases: ['ft', 'fort'],
			group: 'games',
			memberName: 'fortnite',
			description: 'Shows Fortnite player stats for the specified player.',
			examples: ['ft YellowJay64', 'ft pc YellowJay64', 'ft status', 'ft news'],
			throttling: {
				usages: 2,
				duration: 10,
			},
			guildOnly: false,
			args: [
				{
					key: 'arg',
					prompt: 'What would you like to do with the Fortnite Command?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { arg }) {
		const platformRegex = /^pc|xb1|ps4\s/;
		const platform = arg.match(platformRegex);
		if (!platform) {
			fortnite.login()
				.then(() => {
					switch (arg) {
						case 'status':
							fortnite.checkFortniteStatus()
								.then(status => {
									if (!status) return message.say('Fortnite is Down! Check https://twitter.com/FortniteGame!');
									message.say('Fortnite is Online!');
								})
								.catch(error => {
									console.error(`FORTNITE STATUS: ${error}`);
									message.say('Failed to check Fortnite Status.');
								});
							break;
						case 'news':
							fortnite.getFortniteNews('en')
								.then(news => {
									const fortNewsEmbed = {
										color: 0x8e44ad,
										title: 'Fornite News',
										author: {
											name: 'YellowJay',
											icon_url: process.env.AVATAR_URL,
											url: 'https://kazijawad.github.io/',
										},
										fields: [
											{
												name: news['br'][0]['title'],
												value: news['br'][0]['body'],
											},
											{
												name: news['br'][1]['title'],
												value: news['br'][1]['body'],
											},
											{
												name: news['br'][2]['title'],
												value: news['br'][2]['body'],
											},
										],
										timestamp: new Date(),
										footer: {
											text: '@KazBot',
											icon_url: message.client.user.avatarURL,
										},
									};

									message.embed(fortNewsEmbed);
								})
								.catch(error => {
									console.error(`FORTNITE NEWS: ${error}`);
									message.say('Failed to find Fortnite News.');
								});
							break;
						default:
							fortnite.getStatsBR(arg, 'pc')
								.then(stats => {
									const fortStatsEmbed = {
										color: 0x8e44ad,
										title: `${stats['info']['username']}'s Fortnite Stats`,
										author: {
											name: 'YellowJay',
											icon_url: process.env.AVATAR_URL,
											url: 'https://kazijawad.github.io/',
										},
										fields: [
											{
												name: 'Overall',
												value: `Wins: ${stats['lifetimeStats']['wins']} | Win %: ${stats['lifetimeStats']['win%']}\nKills: ${stats['lifetimeStats']['kills']} | K/D: ${stats['lifetimeStats']['k/d']}\nKills Per Minute: ${stats['lifetimeStats']['killsPerMin']}\nMatches: ${stats['lifetimeStats']['matches']}\nPlaytime: ${stats['lifetimeStats']['timePlayed']}`,
											},
											{
												name: 'Solo',
												value: `Wins: ${stats['group']['solo']['wins']} | Win %: ${stats['group']['solo']['win%']}\nTop 10: ${stats['group']['solo']['top10']} | Top 25: ${stats['group']['solo']['top25']}\nKills: ${stats['group']['solo']['kills']} | K/D: ${stats['group']['solo']['k/d']}\nKills Per Match: ${stats['group']['solo']['killsPerMatch']}\nMatches: ${stats['group']['solo']['matches']} | Playtime: ${stats['group']['solo']['timePlayed']}`,
											},
											{
												name: 'Duo',
												value: `Wins: ${stats['group']['duo']['wins']} | Win%: ${stats['group']['duo']['win%']}\nTop 5: ${stats['group']['duo']['top5']} | Top 12: ${stats['group']['duo']['top12']}\nKills: ${stats['group']['duo']['kills']} | K/D: ${stats['group']['duo']['k/d']}\nKills Per Match: ${stats['group']['duo']['killsPerMatch']}\nMatches: ${stats['group']['duo']['matches']} | Playtime: ${stats['group']['duo']['timePlayed']}`,
											},
											{
												name: 'Squad',
												value: `Wins: ${stats['group']['squad']['wins']} | Win %: ${stats['group']['squad']['win%']}\nTop 3: ${stats['group']['squad']['top3']} | Top 6: ${stats['group']['squad']['top6']}\nKills: ${stats['group']['squad']['kills']} | K/D: ${stats['group']['squad']['k/d']}\nKills Per Match: ${stats['group']['squad']['killsPerMatch']}\nMatches: ${stats['group']['squad']['matches']} | Playtime: ${stats['group']['squad']['timePlayed']}`,
											},
										],
										timestamp: new Date(),
										footer: {
											text: '@KazBot',
											icon_url: message.client.user.avatarURL,
										},
									};

									message.embed(fortStatsEmbed);
								})
								.catch(error => {
									console.warn(`FORTNITE STATS: ${error}`);
									message.say('Failed to locate Fortnite Username.');
								});
							break;
					}
				})
				.catch(error => {
					console.error(`FORTNITE LOGIN: ${error}`);
				});
		} else if (platform) {
			let player = platform['input'].split(/pc|xb1|ps4|\s/);
			player = player.slice(2).join(' ');
			fortnite.login()
				.then(() => {
					fortnite.getStatsBR(player, platform[0])
						.then(stats => {
							const fortStatsEmbed = {
								color: 0x8e44ad,
								title: `${stats['info']['username']}'s Fortnite Stats`,
								author: {
									name: 'YellowJay',
									icon_url: process.env.AVATAR_URL,
									url: 'https://kazijawad.github.io/',
								},
								fields: [
									{
										name: 'Overall',
										value: `Wins: ${stats['lifetimeStats']['wins']} | Win %: ${stats['lifetimeStats']['win%']}\nKills: ${stats['lifetimeStats']['kills']} | K/D: ${stats['lifetimeStats']['k/d']}\nKills Per Minute: ${stats['lifetimeStats']['killsPerMin']}\nMatches: ${stats['lifetimeStats']['matches']}\nPlaytime: ${stats['lifetimeStats']['timePlayed']}`,
									},
									{
										name: 'Solo',
										value: `Wins: ${stats['group']['solo']['wins']} | Win %: ${stats['group']['solo']['win%']}\nTop 10: ${stats['group']['solo']['top10']} | Top 25: ${stats['group']['solo']['top25']}\nKills: ${stats['group']['solo']['kills']} | K/D: ${stats['group']['solo']['k/d']}\nKills Per Match: ${stats['group']['solo']['killsPerMatch']}\nMatches: ${stats['group']['solo']['matches']} | Playtime: ${stats['group']['solo']['timePlayed']}`,
									},
									{
										name: 'Duo',
										value: `Wins: ${stats['group']['duo']['wins']} | Win%: ${stats['group']['duo']['win%']}\nTop 5: ${stats['group']['duo']['top5']} | Top 12: ${stats['group']['duo']['top12']}\nKills: ${stats['group']['duo']['kills']} | K/D: ${stats['group']['duo']['k/d']}\nKills Per Match: ${stats['group']['duo']['killsPerMatch']}\nMatches: ${stats['group']['duo']['matches']} | Playtime: ${stats['group']['duo']['timePlayed']}`,
									},
									{
										name: 'Squad',
										value: `Wins: ${stats['group']['squad']['wins']} | Win %: ${stats['group']['squad']['win%']}\nTop 3: ${stats['group']['squad']['top3']} | Top 6: ${stats['group']['squad']['top6']}\nKills: ${stats['group']['squad']['kills']} | K/D: ${stats['group']['squad']['k/d']}\nKills Per Match: ${stats['group']['squad']['killsPerMatch']}\nMatches: ${stats['group']['squad']['matches']} | Playtime: ${stats['group']['squad']['timePlayed']}`,
									},
								],
								timestamp: new Date(),
								footer: {
									text: '@KazBot',
									icon_url: message.client.user.avatarURL,
								},
							};

							message.embed(fortStatsEmbed);
						})
						.catch(error => {
							console.warn(`FORTNITE STATS: ${error}`);
							message.say('Failed to locate Fortnite Username.');
						});
				});
		}
	}
}

module.exports = FortniteCommand;
