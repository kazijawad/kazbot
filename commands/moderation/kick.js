const { Command } = require('discord.js-commando');

module.exports = class KickCommmand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a specific user from the server.',
			examples: ['kick @YellowJay#5984', 'kick YellowJay'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					prompt: 'Who would you like to kick?',
					type: 'member',
				},
			],
		});
	}

	hasPermission(message) {
		return message.member.hasPermission('ADMINISTRATOR');
	}

	async run(message, { member }) {
		member.kick()
			.then(() => message.say(`Kicked ${member.displayName}`))
			.catch(() => {
				console.error();
				message.say(`Failed to kick ${member.displayName}.`);
			});
	}
};