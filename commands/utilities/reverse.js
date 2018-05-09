const { Command } = require('discord.js-commando');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			group: 'utilities',
			memberName: 'reverse',
			description: 'Reverses any string passed through.',
			examples: ['reverse test'],
			guildOnly: false,
			args: [
				{
					key: 'string',
					prompt: 'What would you like to reverse',
					type: 'string',
				},
			],
		});
	}

	async run(message, { string }) {
		const reverse = string.split('').reverse().join('');
		message.say(`${string} ---> ${reverse}`);
	}
};
