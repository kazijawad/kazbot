const Discord = require('discord.js');
const Urban = require('relevant-urban');

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

		Urban(phrase)
			.then(term => {
				const phraseEmbed = new Discord.RichEmbed()
					.setColor('LIGHT_GREY')
					.setTitle(term.word)
					.addField('Definition', term.definition)
					.addField('Example', term.example)
					.addField('Author', term.author, true)
					.addField('Thumbs Up', term.thumbsUp, true)
					.addField('Thumbs Down', term.thumbsDown, true)
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());

				return message.channel.send({ embed: phraseEmbed });
			})
			.catch(() => {
				return message.channel.send('Unable to retrieve word from Urban Dictionary!');
			});
	},
};