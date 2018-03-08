module.exports = {
	name: 'role',
	aliases: ['roles'],
	description: 'Flexible Role Cmd!',
	usage: '[Discord Member/Role Name]',
	cooldown: 3,
	guildOnly: true,
	execute(message, args) {
		if (args[0] === undefined) return message.reply('\n' + message.member.highestRole.name);
		if (args == 'all') return message.reply('\n' + message.guild.roles.map(r => r.name).join('\n'));

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