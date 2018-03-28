module.exports = {
	name: 'kick',
	description: 'Allows for an Admin to kick members from the server!',
	args: true,
	usage: '[@Discord User]',
	cooldown: 5,
	guildOnly: true,
	execute(message) {
		const member = message.mentions.members.first();

		if (!message.member.hasPermission('KICK_MEMBERS', true)) {
			return message.reply('You do not have permission to use the kick command!');
		}

		member.kick()
			.then(() => message.channel.send(`Kicked ${member.displayName}!`))
			.catch(message.channel.send(`Failed to kick ${member.displayName}!`));
	},
};