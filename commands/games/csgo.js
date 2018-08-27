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
						const rawStats = res['data']['playerstats']['stats'];
						const stats = {};
						for (let i = 0; i < rawStats.length; i++) {
							stats[rawStats[i]['name']] = rawStats[i]['value'];
						}

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
									name: 'Playtime',
									value: stats['total_time_played'],
									inline: true,
								},
								{
									name: 'Matches',
									value: stats['total_matches_played'],
									inline: true,
								},
								{
									name: 'Rounds',
									value: stats['total_rounds_played'],
									inline: true,
								},
								{
									name: 'Wins',
									value: stats['total_wins'],
									inline: true,
								},
								{
									name: 'Match Wins',
									value: stats['total_matches_won'],
									inline: true,
								},
								{
									name: 'Money Earned',
									value: stats['total_money_earned'],
									inline: true,
								},
								{
									name: 'Kills',
									value: stats['total_kills'],
									inline: true,
								},
								{
									name: 'Knife Kills',
									value: stats['total_kills_knife_fight'],
									inline: true,
								},
								{
									name: 'Kills Against Snipers',
									value: stats['total_kills_against_zoomed_sniper'],
									inline: true,
								},
								{
									name: 'Deaths',
									value: stats['total_deaths'],
									inline: true,
								},
								{
									name: 'Dominations',
									value: stats['total_dominations'],
									inline: true,
								},
								{
									name: 'Revenges',
									value: stats['total_revenges'],
									inline: true,
								},
								{
									name: 'Damage Done',
									value: stats['total_damage_done'],
									inline: true,
								},
								{
									name: 'Shots Hit',
									value: stats['total_shots_hit'],
									inline: true,
								},
								{
									name: 'Shots Fired',
									value: stats['total_shots_fired'],
									inline: true,
								},
								{
									name: 'MVPS',
									value: stats['total_mvps'],
									inline: true,
								},
								{
									name: 'Planted Bombs',
									value: stats['total_planted_bombs'],
									inline: true,
								},
								{
									name: 'Defused Bombs',
									value: stats['total_defused_bombs'],
									inline: true,
								},
								{
									name: 'Weapons Donated',
									value: stats['total_weapons_donated'],
									inline: true,
								},
								{
									name: 'Broken Windows',
									value: stats['total_broken_windows'],
									inline: true,
								},
								{
									name: 'Rescued Hostages',
									value: stats['total_rescued_hostages'],
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
						message.say('Failed to retrieve player stats. Game stats must be set to public on the player\'s Steam profile.');
					});
			})
			.catch(error => {
				console.error(`STEAM VANITY URL: ${error}`);
				message.say('Failed to retrieve player.');
			});
	}
}

module.exports = CSGOCommand;
