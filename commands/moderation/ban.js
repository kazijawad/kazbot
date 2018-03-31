const { Command } = require('discord.js-commando');

module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans a specific user from the server.',
			examples: ['ban @YellowJay#5984', 'ban YellowJay'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					prompt: 'Who would you like to ban?',
					type: 'member',
				},
			],
		});
	}

	hasPermission(message) {
		return message.member.hasPermission('ADMINISTRATOR');
	}

	async run(message, { member }) {
		member.ban()
			.then(() => message.say(`Banned ${member.displayName}`))
			.catch(() => {
				console.error();
				message.say(`Failed to ban ${member.displayName}.`);
			});
	}
};