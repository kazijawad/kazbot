const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['commands', 'support', 'info'],
	description: 'List of all available Commands',
	usage: '[Command Name]',
	example: 'help',
	cooldown: 3,
	guildOnly: false,
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

			data.push(`Name: ${command.name}\n`);

			if (command.description) data.push(`Description: ${command.description}\n`);
			if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}\n`);
			if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}\n`);
			if (command.example) data.push(`Example: ${prefix}${command.name} ${command.example}\n`);

			data.push(`Cooldown: ${command.cooldown || 3} second(s)`);
		}
		message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type !== 'dm') {
					return message.channel.send('I\'ve sent you a DM with all my commands!');
				}
			})
			.catch(() => message.reply('it seems like I can\'t DM you!'));
	},
};