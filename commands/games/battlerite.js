const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class BattleriteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'battlerite',
			aliases: ['br'],
			group: 'games',
			memberName: 'battlerite',
			description: 'Shows Battlerite player stats for the specified player',
			examples: ['br TimmehHD'],
			guildOnly: false,
			args: [
				{
					key: 'username',
					prompt: 'Which Battlerite player would you like to lookup?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { username }) {
		const options = {
			url: `https://api.dc01.gamelockerapp.com/shards/global/players?filter[playerNames]=${username}`,
			headers: {
				'Authorization': 'Bearer ' + process.env.battleriteAPI,
				'Accept': 'application/vnd.api+json',
			},
		};

		request(options, (err, res, body) => {
			if (err) {
				console.log(err);
				return message.say('Failed to retrieve Battlerite player!');
			}
			const info = JSON.parse(body);
			if (info.data[0] === undefined) {
				return message.say('Failed to retrieve Battlerite player!');
			}

			const stats = info.data[0].attributes.stats;
			const battleriteEmbed = new RichEmbed()
				.setColor('ORANGE')
				.setTitle(`${info.data[0].attributes.name}'s Battlerite Stats`)
				.addField('Total Matches', stats['2'] + stats['3'], true)
				.addField('Total Wins', stats['2'], true)
				.addField('Total Losses', stats['3'], true)
				.addField('League 2v2', stats['14'] + '-' + stats['15'], true)
				.addField('League 3v3', stats['16'] + '-' + stats['17'], true)
				.addField('Quickmatch 2v2', stats['10'] + '-' + stats['11'], true)
				.addField('Quickmatch 3v3', stats['12'] + '-' + stats['13'], true)
				.setFooter('@Kaz-Bot')
				.setTimestamp(new Date());

			message.embed(battleriteEmbed);
		});
	}
};