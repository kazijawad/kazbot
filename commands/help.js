const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['commands', 'support'],
	description: 'List of all available Commands',
	usage: '[Command Name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;
		const data = [];
		if (!args.length) {
			data.push('__Command List__');
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nUse \`${prefix}help [command name]\` to get info on a specific command!`);
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply('That\'s not a valid command!');
			}

			const command = commands.get(args[0]);

			data.push(`__Name:__ ${command.name}`);

			if (command.description) data.push(`__Description:__ ${command.description}`);
			if (command.aliases) data.push(`__Aliases:__ ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`__Usage:__ ${prefix}${command.name} ${command.usage}`);

			data.push(`__Cooldown:__ ${command.cooldown || 3} second(s)`);
		}
		message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type !== 'dm') {
					message.channel.send('I\'ve sent you a DM with all my commands!');
				}
			})
			.catch(() => message.reply('it seems like I can\'t DM you!'));
	},
};