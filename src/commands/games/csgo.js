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
			description: 'Retrieves CSGO stats for the specified player. Game details must be set to public in the player\'s privacy settings.',
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
		try {
			const response = await instance.get('/ISteamUser/ResolveVanityURL/v1/', { params: { key: process.env.STEAM_API, vanityurl: player } });
			const steamID = response['data']['response']['steamid'];

			try {
				const data = await instance.get('/ISteamUserStats/GetUserStatsForGame/v2/', { params: { key: process.env.STEAM_API, appid: 730, steamid: steamID } });
				const rawStats = data['data']['playerstats']['stats'];

				const stats = {};
				for (let i = 0; i < rawStats.length; i++) {
					stats[rawStats[i]['name']] = rawStats[i]['value'];
				}

				message.embed({
					color: 0xf1c40f,
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
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: `${player}'s CSGO Stats`,
				});
			} catch (error) {
				console.error(`[STEAM USER STATS] ${error.message}`);
				message.embed({
					color: 0xf1c40f,
					description: 'Failed to retrieve player stats. Game details must be set to public on the player\'s privacy settings.',
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: 'Steam User Stats',
				});
			}
		} catch (error) {
			console.error(`[STEAM VANITY URL] ${error.message}`);
			message.embed({
				color: 0xf1c40f,
				description: 'Failed to retrieve player.',
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Steam User Stats',
			});
		}
	}
}

module.exports = CSGOCommand;
