const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			group: 'misc',
			memberName: 'urban',
			description: 'Retrieves a word from Urban Dictionary.',
			examples: ['urban Discord'],
			guildOnly: false,
			args: [
				{
					key: 'phrase',
					prompt: 'What would you like to lookup?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { phrase }) {
		const options = {
			'url': `http://api.urbandictionary.com/v0/define?term=${phrase}`,
		};

		request(options, (error, res, body) => {
			if (error) {
				console.error(`URBAN DICTIONARY API: ${error}`);
				return message.say('Failed to retrieve word from Urban Dictionary.');
			}
			const info = JSON.parse(body);
			const term = info.list[0];

			if (!term) {
				return message.say('This word does not exist in Urban Dictionary.');
			}

			const termEmbed = new RichEmbed()
				.setColor('LIGHT_GREY')
				.setTitle(term.word)
				.addField('Definition', term.definition)
				.addField('Example', term.example)
				.addField('Author', term.author, true)
				.addField('Thumbs Up', term.thumbs_up, true)
				.addField('Thumbs Down', term.thumbs_down, true)
				.setFooter('@Kaz-Bot')
				.setTimestamp(new Date());

			message.embed(termEmbed);
		});
	}
};
