const discord = require('discord.js');
const overwatch = require('overwatch-js');

module.exports = {
	name: 'ow',
	aliases: ['overwatch'],
	description: 'Shows all Overwatch Player Stats',
	args: true,
	usage: '[USERNAME-TAG] [PLATFORM]',
	cooldown: 10,
	execute(message, args) {
		overwatch.getOverall('pc' || args[1], 'us', args[0])
			.then((stats) => {
				const owEmbed = new discord.RichEmbed()
					.setColor('BLUE')
					.setTitle(stats['profile']['nick'] + '\'s Competitve Overwatch Stats')
					.setThumbnail(stats['profile']['avatar'])
					.addField('Level', stats['profile']['level'], true)
					.addField('Rank', stats['profile']['ranking'] + ' | ' + stats['profile']['rank'], true)
					.addField('Total Wins', stats['competitive']['global']['games_won'], true)
					.addField('Total Kills', stats['competitive']['global']['eliminations'], true)
					.addField('Total Deaths', stats['competitive']['global']['deaths'], true)
					.addField('Best MultiKill', stats['competitive']['global']['multikill_best'], true)
					.addField('Most Gold Medals', stats['competitive']['global']['medals_gold'])
					.addField('Total Playtime', stats['competitive']['global']['time_played'])
					.setTimestamp(new Date())
					.setFooter('@Kaz-Bot');
				return message.channel.send({ embed: owEmbed });
			})
			.catch((err) => {
				console.log(err);
				return message.channel.send('Unable to retrieve Overwatch Play Stats!');
			});
	},
};