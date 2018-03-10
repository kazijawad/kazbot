module.exports = {
	name: 'role',
	description: 'Flexible Role Command!',
	usage: '[Role Name]',
	cooldown: 3,
	guildOnly: true,
	execute(message, args) {
		if (args[0] === undefined) return message.reply('\n' + message.member.highestRole.name);

		const arg = args.join(' ');
		const role = message.guild.roles.exists('name', arg);

		if (role === true) {
			return message.reply('\n' + message.guild.roles.find('name', arg).members.map(r => r.displayName).join('\n'));
		}
		else {
			return message.reply('Failed to execute command!');
		}
	},
};