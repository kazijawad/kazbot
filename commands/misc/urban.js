const { Command } = require('discord.js-commando');
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
				const termExample = term['example'] ? term['example'] : 'N/A';

				const termEmbed = {
					color: 0xd3d3d3,
					title: term['word'],
					author: {
						name: 'KazBot',
						icon_url: process.env.AVATAR_URL,
						url: 'https://kazijawad.github.io/',
					},
					fields: [
						{
							name: 'Definition',
							value: term['definition'],
						},
						{
							name: 'Example',
							value: termExample,
						},
						{
							name: 'Author',
							value: term['author'],
							inline: true,
						},
						{
							name: 'Thumbs Up',
							value: term['thumbs_up'],
							inline: true,
						},
						{
							name: 'Thumbs Down',
							value: term['thumbs_down'],
							inline: true,
						},
					],
					timestamp: new Date(),
					footer: {
						text: '@KazBot',
						icon_url: message.client.user.avatarURL,
					},
				};

				message.embed(termEmbed);
			})
			.catch(() => {
				message.say('Failed to retrieve word from Urban Dictionary.');
			});
	}
}

module.exports = UrbanCommand;
