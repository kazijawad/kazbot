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
			examples: ['wf news ps4'],
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
		instance.get(`/${platform}`)
			.then(response => {
				const data = response['data'];
				switch (option) {
					case 'news': {
						const feed = data['news'][data['news'].length - 1];
						const newsEmbed = {
							color: 0xffd700,
							title: 'Warframe News',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							description: feed.message,
							fields: [
								{
									name: 'ETA',
									value: feed.eta,
								},
							],
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(newsEmbed);
						break;
					}
					case 'baro': {
						const feed = data['voidTrader'];
						const voidEmbed = {
							color: 0xffd700,
							title: 'Warframe Void Trader',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							description: feed.character,
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
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(voidEmbed);
						break;
					}
					case 'sortie': {
						const feed = data['sortie'];
						const sortieEmbed = {
							color: 0xffd700,
							title: 'Warframe Sortie',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							description: feed.character,
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
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(sortieEmbed);
						break;
					}
					case 'daily': {
						const feed = data['dailyDeals'][0];
						const dailyEmbed = {
							color: 0xffd700,
							title: 'Warframe Daily Deal',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							description: feed.item,
							fields: [
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
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(dailyEmbed);
						break;
					}
					case 'simaris': {
						const feed = data['simaris'];
						const simarisEmbed = {
							color: 0xffd700,
							title: 'Warframe Simaris',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							fields: [
								{
									name: 'Target',
									value: feed.target,
									inline: true,
								},
							],
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(simarisEmbed);
						break;
					}
					case 'earth': {
						const feed = data['earthCycle'];
						const earthEmbed = {
							color: 0xffd700,
							title: 'Warframe Earth Cycle',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
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
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(earthEmbed);
						break;
					}
					case 'cetus': {
						const feed = data['cetusCycle'];
						const cetusEmbed = {
							color: 0xffd700,
							title: 'Warframe Cetus Cycle',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
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
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(cetusEmbed);
						break;
					}
					case 'construction': {
						const feed = data['constructionProgress'];
						const constructEmbed = {
							color: 0xffd700,
							title: 'Warframe Construction Progress',
							author: {
								name: 'KazBot',
								icon_url: process.env.AVATAR_URL,
								url: 'https://kazijawad.github.io/',
							},
							fields: [
								{
									name: 'Fomorian Progress',
									value: feed.fomorianProgress,
									inline: true,
								},
								{
									name: 'Razorback Progress',
									value: feed.razorbackProgress,
									inline: true,
								},
							],
							timestamp: new Date(),
							footer: {
								text: '@KazBot',
								icon_url: message.client.user.avatarURL,
							},
						};

						message.embed(constructEmbed);
						break;
					}
					default: {
						message.say('Invalid warframe option!');
					}
				}
			})
			.catch(error => {
				console.error(`WARFRAME API: ${error}`);
				message.say('Failed to connect to the Warframe API!');
			});
	}
}

module.exports = WarframeCommand;
