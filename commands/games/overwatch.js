const { Command } = require('discord.js-commando');
const Overwatch = require('overwatch-js');

class OverwatchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'overwatch',
			aliases: ['ow'],
			group: 'games',
			memberName: 'overwatch',
			description: 'Shows Overwatch player stats for the specificed player.',
			examples: ['ow YellowJay-1902', 'ow YellowJay-1902 pc'],
			throttling: {
				usages: 2,
				duration: 10,
			},
			guildOnly: false,
			args: [
				{
					key: 'username',
					prompt: 'Which Overwatch player would you like to lookup?',
					type: 'string',
				},
				{
					key: 'platform',
					prompt: 'Which platform would you like to lookup',
					type: 'string',
					default: 'pc',
				},
			],
		});
	}

	async run(message, { username, platform }) {
		Overwatch.getOverall(platform, 'us', username)
			.then(stats => {
				const owEmbed = {
					color: 0xff9f43,
					title: `${stats['profile']['nick']}'s Competitve Overwatch Stats`,
					author: {
						name: 'YellowJay',
						icon_url: process.env.AVATAR_URL,
						url: 'https://kazijawad.github.io/',
					},
					thumbnail: {
						url: stats['profile']['avatar'],
					},
					fields: [
						{
							name: 'Level',
							value: stats['profile']['level'],
							inline: true,
						},
						{
							name: 'Rank',
							value: `${stats['profile']['ranking']} | ${stats['profile']['rank']}`,
							inline: true,
						},
						// {
						// 	name: 'Total Wins',
						// 	value: stats['competitive']['global']['games_won'],
						// 	inline: true,
						// },
						// {
						// 	name: 'Total Kills',
						// 	value: stats['competitive']['global']['eliminations'],
						// 	inline: true,
						// },
						// {
						// 	name: 'Total Deaths',
						// 	value: stats['competitive']['global']['deaths'],
						// 	inline: true,
						// },
						// {
						// 	name: 'Best MultiKill',
						// 	value: stats['competitive']['global']['multikill_best'],
						// 	inline: true,
						// },
						// {
						// 	name: 'Most Gold Medals',
						// 	value: stats['competitive']['global']['medals_gold'],
						// 	inline: true,
						// },
						// {
						// 	name: 'Total Playtime',
						// 	value: stats['competitive']['global']['time_played'],
						// 	inline: true,
						// },
					],
					timestamp: new Date(),
					footer: {
						text: '@KazBot',
						icon_url: message.client.user.avatarURL,
					},
				};

				message.embed(owEmbed);
			})
			.catch(error => {
				console.error(`OVERWATCH API: ${error}`);
				message.say('Unable to retrieve Overwatch Play Stats!');
			});
	}
}

module.exports = OverwatchCommand;
