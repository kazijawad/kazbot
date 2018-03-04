const discord = require('discord.js');

module.exports = {
	name: 'credit',
	description: 'Credit to all the bot\' resources!',
	cooldown: 3,
	execute(message) {
		const creditEmbed = new discord.RichEmbed()
			.setColor('GOLD')
			.setTitle('Credits')
			.addField('Discord.js', 'https://discord.js.org/#/')
			.addField('Fortnite API', 'https://github.com/qlaffont/fortnite-api')
			.addField('Overwatch API', 'https://github.com/gclem/overwatch-js')
			.addField('League of Legends API', 'https://developer.riotgames.com/api-methods/' + '\n' + 'https://github.com/Colorfulstan/LeagueJS')
			.addField('Github Repository', 'https://github.com/kazijawad/discord-bot')
			.addField('Discord Bot Icon', 'Icon made by Plainicon from www.flaticon.com is licensed by CC 3.0 BY')
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.channel.send({ embed: creditEmbed });
	},
};