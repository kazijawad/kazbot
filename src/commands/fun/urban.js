const axios = require('axios');
const { Command } = require('discord.js-commando');

const instance = axios.create({
	baseURL: 'http://api.urbandictionary.com/v0',
});

class UrbanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urban',
			group: 'fun',
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
			nsfw: true,
		});
	}

	async run(message, { phrase }) {
		try {
			const response = await instance.get('/define', { params: { term: phrase } });
			const term = response['data']['list'][0];

			if (!term) {
				return message.embed({
					color: 0x3498db,
					description: `${phrase} cannot be found on Urban Dictionary.`,
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: 'Urban Dictionary',
				});
			}

			const termExample = term['example'] ? term['example'] : 'N/A';

			message.embed({
				color: 0x3498db,
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
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Urban Dictionary',
			});
		} catch (error) {
			message.embed({
				color: 0x3498db,
				description: 'Failed to retrieve word from Urban Dictionary',
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Urban Dictionary',
			});
		}
	}
}

module.exports = UrbanCommand;
