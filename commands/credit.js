const discord = require('discord.js');

module.exports = {
	name: 'credit',
	description: 'Credit to all the bot\' resources!',
	args: false,
	cooldown: 3,
	guildOnly: false,
	execute(message) {
		const creditEmbed = new discord.RichEmbed()
			.setColor('GOLD')
			.setTitle('Credits')
			.addField('Discord.js', 'https://discord.js.org/#/')
			.addField('Fortnite API', 'https://github.com/qlaffont/fortnite-api')
			.addField('Overwatch API', 'https://github.com/gclem/overwatch-js')
			.addField('League of Legends API', 'https://developer.riotgames.com/api-methods/' + '\n' + 'https://github.com/Colorfulstan/LeagueJS')
			.addField('Github Repository', 'https://github.com/kazijawad/kaz-bot')
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		return message.channel.send({ embed: creditEmbed });
	},
};