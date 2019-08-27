const { Command } = require('discord.js-commando');
const Fortnite = require('fortnite-api');

const fortniteAPI = [
	process.env.FORTNITE_EMAIL,
	process.env.FORTNITE_PASS,
	process.env.FORTNITE_LAUNCH,
	process.env.FORTNITE_CLIENT,
];
const fortnite = new Fortnite(fortniteAPI);

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
		fortnite.login().then(async () => {
			switch (arg) {
				case 'status':
					try {
						const status = await fortnite.checkFortniteStatus();
						if (!status) {
							message.embed({
								color: 0xf6e58d,
								description: 'Fortnite is down! Check https://twitter.com/FortniteGame',
								footer: {
									text: '@KazBot',
									icon_url: process.env.AVATAR_URL,
								},
								timestamp: new Date(),
								title: 'Fortnite Server Status',
							});
						} else {
							message.embed({
								color: 0xf6e58d,
								description: 'Fortnite is online!',
								footer: {
									text: '@KazBot',
									icon_url: process.env.AVATAR_URL,
								},
								timestamp: new Date(),
								title: 'Fortnite Server Status',
							});
						}
					} catch (error) {
						console.error(`[FORTNITE STATUS] ${error.message}`);
						message.embed({
							color: 0xf6e58d,
							description: 'Failed to check Fortnite status.',
							footer: {
								text: '@KazBot',
								icon_url: process.env.AVATAR_URL,
							},
							timestamp: new Date(),
							title: 'Fortnite Server Status',
						});
					}
					break;
				case 'news':
					try {
						const news = await fortnite.getFortniteNews('en');
						message.embed({
							color: 0xf6e58d,
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
							footer: {
								text: '@KazBot',
								icon_url: process.env.AVATAR_URL,
							},
							timestamp: new Date(),
							title: 'Fortnite News',
						});
					} catch (error) {
						console.error(`[FORTNITE NEWS] ${error.message}`);
						message.embed({
							color: 0xf6e58d,
							description: 'Failed to find Fortnite news.',
							footer: {
								text: '@KazBot',
								icon_url: process.env.AVATAR_URL,
							},
							timestamp: new Date(),
							title: 'Fortnite News',
						});
					}
					break;
				default:
					try {
						let stats = null;
						if (!platform) {
							stats = await fortnite.getStatsBR(arg, 'pc');
						} else {
							const player = platform['input'].split(/pc|xb1|ps4|\s/).slice(2).join(' ');
							stats = await fortnite.getStatsBR(player, platform[0]);
						}

						message.embed({
							color: 0xf6e58d,
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
							footer: {
								text: '@KazBot',
								icon_url: process.env.AVATAR_URL,
							},
							timestamp: new Date(),
							title: `${stats['info']['username']}'s Fortnite Stats`,
						});
					} catch (error) {
						console.warn(`[FORTNITE STATS] ${error.message}`);
						message.embed({
							color: 0xf6e58d,
							description: 'Failed to locate Fortnite username.',
							footer: {
								text: '@KazBot',
								icon_url: process.env.AVATAR_URL,
							},
							timestamp: new Date(),
							title: 'Fortnite User Stats',
						});
					}
			}
		}).catch(error => {
			console.error(`[FORTNITE LOGIN] ${error.message}`);
		});
	}
}

module.exports = FortniteCommand;
