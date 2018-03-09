module.exports = {
	name: 'prune',
	aliases: ['cut', 'shorten', 'purge'],
	description: 'Delete previous messages in the channel!',
	args: true,
	usage: '[VALUE]',
	cooldown: 3,
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (!message.member.hasPermission('MANAGE_MESSAGES', true)) {
			return message.reply('You cannot use this command!');
		}

		if (isNaN(amount)) {
			return message.reply('Invalid Argument');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('The argument has to be between 1 and 99');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to prune messages in this channel!');
		});
	},
};