const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class CreditCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'credit',
			group: 'misc',
			memberName: 'credit',
			description: 'Credit to all the Bot\'s Resources.',
			examples: ['credit'],
			guildOnly: false,
		});
	}

	async run(message) {
		const creditEmbed = new RichEmbed()
			.setColor('GOLD')
			.setTitle('Credits')
			.addField('Discord.js', 'https://discord.js.org/#/')
			.addField('Fortnite API Wrapper', 'https://github.com/qlaffont/fortnite-api')
			.addField('Battlerite API', 'https://developer.battlerite.com')
			.addField('Overwatch API Wrapper', 'https://github.com/gclem/overwatch-js')
			.addField('League of Legends API', 'https://developer.riotgames.com/api-methods/' + '\n' + 'https://github.com/Colorfulstan/LeagueJS')
			.addField('CoinMarketCap API Wrapper', 'https://github.com/tiaanduplessis/coinmarketcap-api')
			.addField('Urban Dictionary Wrapper', 'https://github.com/SnekJS/urban.js')
			.addField('Youtube Download Module', 'https://github.com/fent/node-ytdl-core')
			.addField('Github Repository', 'https://github.com/kazijawad/kaz-bot')
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.embed(creditEmbed);
	}
};