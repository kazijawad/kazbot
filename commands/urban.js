const Discord = require('discord.js');
const request = require('request');

module.exports = {
	name: 'urban',
	aliases: ['ud'],
	description: 'Search words from Urban Dictionary!',
	args: true,
	usage: '[WORD]',
	cooldown: 5,
	guildOnly: false,
	execute(message, args) {
		const phrase = args.join(' ');
		const options = {
			'url': `http://api.urbandictionary.com/v0/define?term=${phrase}`,
		};

		request(options, (err, res, body) => {
			if (err) {
				console.log(err);
				return message.channel.send('Failed to retrieve word from Urban Dictionary!');
			}
			const info = JSON.parse(body);
			const term = info.list[0];
			const termEmbed = new Discord.RichEmbed()
				.setColor('LIGHT_GREY')
				.setTitle(term.word)
				.addField('Definition', term.definition)
				.addField('Example', term.example)
				.addField('Author', term.author, true)
				.addField('Thumbs Up', term.thumbs_up, true)
				.addField('Thumbs Down', term.thumbs_down, true)
				.setFooter('@Kaz-Bot')
				.setTimestamp(new Date());

			message.channel.send({ embed: termEmbed });
		});
	},
};