const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prune',
			aliases: ['purge', 'cut'],
			group: 'moderation',
			memberName: 'prune',
			description: 'Prunes messages in a text channel.',
			examples: ['prune 1', 'prune 99'],
			guildOnly: true,
			args: [
				{
					key: 'amount',
					prompt: 'How many messages would you like to prune?',
					type: 'integer',
				},
			],
		});
	}

	hasPermission(message) {
		return message.member.hasPermission('ADMINISTRATOR');
	}

	async run(message, { amount }) {
		let number = parseInt(amount) + 1;

		if (number > 100) {
			number = 100;
		}

		message.channel.bulkDelete(number, true)
			.catch(() => {
				message.say('Failed to prune messages in this channel.');
			});
	}
};