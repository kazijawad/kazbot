const { Command } = require('discord.js-commando');

class PruneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prune',
			aliases: ['purge', 'cut'],
			group: 'moderation',
			memberName: 'prune',
			description: 'Prunes messages in a text channel.',
			examples: ['prune 1', 'prune 99'],
			guildOnly: true,
			clientPermissions: ['MANAGE_MESSAGES'],
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					key: 'amount',
					prompt: 'How many messages would you like to prune?',
					type: 'integer',
				},
			],
		});
	}

	async run(message, { amount }) {
		let number = parseInt(amount) + 1;
		if (number > 100) { number = 100; }

		try {
			await message.channel.bulkDelete(number, true);
		} catch (error) {
			message.embed({
				color: 0xe74c3c,
				description: 'Failed to prune messages in this channel.',
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Prune Command',
			});
		}
	}
}

module.exports = PruneCommand;
