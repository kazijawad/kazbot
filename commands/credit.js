const Discord = require('discord.js');

module.exports = {
	name: 'credit',
	description: 'Credit to all the bot\' resources!',
	args: false,
	cooldown: 3,
	guildOnly: false,
	execute(message) {
		const creditEmbed = new Discord.RichEmbed()
			.setColor('GOLD')
			.setTitle('Credits')
			.addField('Discord.js', 'https://discord.js.org/#/')
			.addField('Fortnite API Wrapper', 'https://github.com/qlaffont/fortnite-api')
			.addField('Battlerite API Wrapper', 'https://github.com/Dragory/battlerite.js')
			.addField('Overwatch API Wrapper', 'https://github.com/gclem/overwatch-js')
			.addField('League of Legends API', 'https://developer.riotgames.com/api-methods/' + '\n' + 'https://github.com/Colorfulstan/LeagueJS')
			.addField('CoinMarketCap API Wrapper', 'https://github.com/tiaanduplessis/coinmarketcap-api')
			.addField('Urban Dictionary Wrapper', 'https://github.com/SnekJS/urban.js')
			.addField('Youtube Download Module', 'https://github.com/fent/node-ytdl-core')
			.addField('Github Repository', 'https://github.com/kazijawad/kaz-bot')
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		return message.channel.send({ embed: creditEmbed });
	},
};