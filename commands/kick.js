module.exports = {
	name: 'kick',
	description: 'Allows for an Admin to kick members from the server!',
	args: true,
	usage: '[Discord Name Mention]',
	cooldown: 5,
	guildOnly: true,
	execute(message) {
		const member = message.mentions.members.first();

		if (!message.member.hasPermission('KICK_MEMBERS', true)) {
			return message.reply('You cannot use this command!');
		}

		member.kick()
			.then(() => message.reply(`Kicked ${member.displayName}!`))
			.catch(message.reply('Failed to execute command!'));
	},
};