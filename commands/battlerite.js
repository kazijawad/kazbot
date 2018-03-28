const Discord = require('discord.js');
const Battlerite = require('battlerite.js');

const battleriteAPI = new Battlerite.Client(process.env.battleriteAPI);

module.exports = {
	name: 'battlerite',
	aliases: ['br'],
	description: 'Shows all Batterite Player Stats',
	args: true,
	usage: '[USERNAME]',
	cooldown: 30,
	guildOnly: false,
	execute(message, args) {
		battleriteAPI.getPlayersByName(args[0])
			.then(player => {
				const battleriteEmbed = new Discord.RichEmbed()
					.setColor('ORANGE')
					.setTitle(player[0]['name'] + '\'s Battlerite Stats')
					.addField('Total Matches', player[0]['stats']['2'] + player[0]['stats']['3'], true)
					.addField('Total Wins', player[0]['stats']['2'], true)
					.addField('Total Losses', player[0]['stats']['3'], true)
					.addField('League 2v2', player[0]['stats']['14'] + '-' + player[0]['stats']['15'], true)
					.addField('League 3v3', player[0]['stats']['16'] + '-' + player[0]['stats']['17'], true)
					.addField('Quickmatch 2v2', player[0]['stats']['10'] + '-' + player[0]['stats']['11'], true)
					.addField('Quickmatch 3v3', player[0]['stats']['12'] + '-' + player[0]['stats']['13'], true)
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());
				return message.channel.send({ embed: battleriteEmbed });
			})
			.catch(err => {
				console.log(err);
				return message.channel.send('Cannot retrieve Player Stats!');
			});
	},
};