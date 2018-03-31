const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Overwatch = require('overwatch-js');

module.exports = class OverwatchCommand extends Command {
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
				const owEmbed = new RichEmbed()
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
				message.embed(owEmbed);
			})
			.catch(err => {
				console.log(err);
				message.say('Unable to retrieve Overwatch Play Stats!');
			});
	}
};