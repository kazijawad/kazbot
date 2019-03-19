const { Command } = require('discord.js-commando');

class KickCommmand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a specific user from the server.',
			examples: ['kick @YellowJay#5984', 'kick YellowJay'],
			guildOnly: true,
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			args: [
				{
					key: 'member',
					prompt: 'Who would you like to kick?',
					type: 'member',
				},
			],
		});
	}

	async run(message, { member }) {
		member.kick()
			.then(() => message.say(`Kicked ${member.displayName}`))
			.catch(() => { message.say(`Failed to kick ${member.displayName}.`); });
	}
}

module.exports = KickCommmand;
