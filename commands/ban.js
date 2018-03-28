module.exports = {
	name: 'ban',
	description: 'Allows for an Admin to ban members from the server!',
	args: true,
	usage: '[@Discord User]',
	cooldown: 5,
	guildOnly: true,
	execute(message) {
		const member = message.mentions.members.first();

		if (!message.member.hasPermission('BAN_MEMBERS', true)) {
			return message.reply('You do not have permission to use the ban command!');
		}

		member.ban()
			.then(() => message.channel.send(`Banned ${member.displayName}`))
			.catch(message.channel.send(`Failed to ban ${member.displayName}!`));
	},
};