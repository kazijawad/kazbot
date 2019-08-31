const { Command } = require('discord.js-commando');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://api.warframestat.us',
});

class WarframeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'warframe',
			aliases: ['wf'],
			group: 'games',
			memberName: 'warframe',
			description: 'Provides various information on the Warframe World State',
			examples: ['wf baro ps4'],
			throttling: {
				usages: 5,
				duration: 20,
			},
			guildOnly: false,
			args: [
				{
					key: 'option',
					prompt: 'What information would you like to lookup about Warframe\'s World State?',
					type: 'string',
				},
				{
					key: 'platform',
					prompt: 'What platform would you like to search on?',
					type: 'string',
					default: 'pc',
				},
			],
		});
	}

	async run(message, { option, platform }) {
		try {
			const response = await instance.get(`/${platform}`);
			const data = response['data'];
			switch (option) {
				case 'baro': {
					const feed = data['voidTrader'];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'Location',
								value: feed.location,
								inline: true,
							},
							{
								name: 'Active',
								value: feed.active,
								inline: true,
							},
							{
								name: 'Arrival',
								value: feed.startString,
								inline: true,
							},
							{
								name: 'Departure',
								value: feed.endString,
								inline: true,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Void Trader Status',
					});
					break;
				}
				case 'sortie': {
					const feed = data['sortie'];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'ETA',
								value: feed.eta,
								inline: true,
							},
							{
								name: 'Faction',
								value: feed.faction,
								inline: true,
							},
							{
								name: 'Boss',
								value: feed.boss,
								inline: true,
							},
							{
								name: 'Mission 01',
								value: `${feed.variants[0].missionType} | ${feed.variants[0].modifier}`,
							},
							{
								name: 'Mission 02',
								value: `${feed.variants[1].missionType} | ${feed.variants[1].modifier}`,
							},
							{
								name: 'Mission 03',
								value: `${feed.variants[2].missionType} | ${feed.variants[2].modifier}`,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Sortie Status',
					});
					break;
				}
				case 'daily': {
					const feed = data['dailyDeals'][0];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'Item',
								value: feed.item,
								inline: true,
							},
							{
								name: 'Original Price',
								value: feed.originalPrice,
								inline: true,
							},
							{
								name: 'Sale Price',
								value: feed.salePrice,
								inline: true,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Daily Deal',
					});
					break;
				}
				case 'simaris': {
					const feed = data['simaris'];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'Target',
								value: feed.target,
								inline: true,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Simaris Status',
					});
					break;
				}
				case 'earth': {
					const feed = data['earthCycle'];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'Daytime',
								value: feed.isDay,
								inline: true,
							},
							{
								name: 'Time Left',
								value: feed.timeLeft,
								inline: true,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Earth Cycle',
					});
					break;
				}
				case 'cetus': {
					const feed = data['cetusCycle'];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'Daytime',
								value: feed.isDay,
								inline: true,
							},
							{
								name: 'Time Left',
								value: feed.timeLeft,
								inline: true,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Cetus Cycle',
					});
					break;
				}
				case 'construction': {
					const feed = data['constructionProgress'];
					message.embed({
						color: 0xf6e58d,
						fields: [
							{
								name: 'Fomorian Progress',
								value: `${feed.fomorianProgress}%`,
								inline: true,
							},
							{
								name: 'Razorback Progress',
								value: `${feed.razorbackProgress}%`,
								inline: true,
							},
						],
						footer: {
							text: '@KazBot',
							icon_url: process.env.AVATAR_URL,
						},
						timestamp: new Date(),
						title: 'Warframe Construction Cycle',
					});
					break;
				}
				default: {
					message.say('Invalid Warframe option.');
				}
			}
		} catch (error) {
			console.error(`[WARFRAME API] ${error.message}`);
			message.embed({
				color: 0xf6e58d,
				description: 'Failed to connect to the Warframe API.',
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Warframe Error',
			});
		}
	}
}

module.exports = WarframeCommand;
