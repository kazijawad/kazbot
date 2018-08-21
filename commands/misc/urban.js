const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'http://api.urbandictionary.com/v0',
});

class UrbanCommand extends Command {
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
		instance.get('/define', { params: { term: phrase } })
			.then(response => {
				const term = response['data']['list'][0];
				if (!term) {
					return message.say(`${phrase} cannot be found on Urban Dictionary`);
				}

				const termEmbed = new RichEmbed()
					.setColor('LIGHT_GREY')
					.setTitle(term['word'])
					.addField('Definition', term['definition']);

				if (term['example'] !== undefined && term['example'] !== null) {
					termEmbed.addField('Example', term['example']);
				}

				termEmbed
					.addField('Author', term['author'], true)
					.addField('Thumbs Up', term['thumbs_up'], true)
					.addField('Thumbs Down', term['thumbs_down'], true)
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());
				message.embed(termEmbed);
			})
			.catch(() => {
				message.say('Failed to retrieve word from Urban Dictionary.');
			});
	}
}

module.exports = UrbanCommand;
