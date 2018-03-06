module.exports = {
	name: 'ban',
	description: 'Allows for an Admin to ban members from the server!',
	args: true,
	cooldown: 5,
	usage: '[Discord Name Mention]',
	guildOnly: true,
	execute(message) {
		const member = message.mentions.members.first();

		if (!message.member.hasPermission('BAN_MEMBERS', true)) {
			return message.reply('You cannot use this command!');
		}

		member.ban()
			.then(() => message.reply(`Banned ${member.displayName}`))
			.catch(message.reply('Failed to execute command!'));
	},
};