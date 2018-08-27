const { Command } = require('discord.js-commando');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://api.steampowered.com',
});

class CSGOCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'csgo',
			aliases: ['cs'],
			group: 'games',
			memberName: 'csgo',
			description: 'Retrieves CSGO stats for the specified player. Game stats must be set to public in the player\'s Steam profile.',
			examples: ['csgo YellowJay'],
			guildOnly: false,
			args: [
				{
					key: 'player',
					prompt: 'Which player would you like to lookup?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { player }) {
		instance.get('/ISteamUser/ResolveVanityURL/v1/', { params: { key: process.env.STEAM_API, vanityurl: player } })
			.then(response => {
				const steamId = response['data']['response']['steamid'];
				instance.get('/ISteamUserStats/GetUserStatsForGame/v2/', { params: { key: process.env.STEAM_API, appid: 730, steamid: steamId } })
					.then(res => {
						const stats = res['data']['playerstats']['stats'];
						const csgoEmbed = {
							color: 0xf1c40f,
							title: `${player}'s CSGO Stats`,
							author: {
								name: 'YellowJay',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							fields: [
								{
									name: 'Total Wins',
									value: stats[5]['value'],
									inline: true,
								},
								{
									name: 'Total Playtime',
									value: stats[2]['value'],
									inline: true,
								},
								{
									name: 'Total Money Earned',
									value: stats[7]['value'],
									inline: true,
								},
								{
									name: 'Total Kills',
									value: stats[0]['value'],
									inline: true,
								},
								{
									name: 'Total Deaths',
									value: stats[1]['value'],
									inline: true,
								},
								{
									name: 'Total Damage Done',
									value: stats[6]['value'],
									inline: true,
								},
								{
									name: 'Total Planted Bombs',
									value: stats[3]['value'],
									inline: true,
								},
								{
									name: 'Total Defused Bombs',
									value: stats[4]['value'],
									inline: true,
								},
							],
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(csgoEmbed);
					})
					.catch(error => {
						console.error(`STEAM USER STATS: ${error}`);
						message.say('Failed to retrieve player stats.');
					});
			})
			.catch(error => {
				console.error(`STEAM VANITY URL: ${error}`);
				message.say('Failed to retrieve player.');
			});
	}
}

module.exports = CSGOCommand;
