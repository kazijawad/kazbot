const Discord = require('discord.js');
const request = require('request');

module.exports = {
	name: 'battlerite',
	aliases: ['br'],
	description: 'Shows all Batterite Player Stats',
	args: true,
	usage: '[USERNAME]',
	cooldown: 30,
	guildOnly: false,
	execute(message, args) {
		const options = {
			url: `https://api.dc01.gamelockerapp.com/shards/global/players?filter[playerNames]=${args[0]}`,
			headers: {
				'Authorization': 'Bearer ' + process.env.battleriteAPI,
				'Accept': 'application/vnd.api+json',
			},
		};

		request(options, (err, res, body) => {
			if (err) {
				console.log(err);
				return message.channel.send('Failed to retrieve Battlerite player!');
			}
			const info = JSON.parse(body);
			const stats = info.data[0].attributes.stats;

			const battleriteEmbed = new Discord.RichEmbed()
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

			message.channel.send({ embed: battleriteEmbed });
		});
	},
};