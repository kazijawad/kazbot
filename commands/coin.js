module.exports = {
	name: 'coin',
	aliases: ['toss'],
	description: 'Toss a coin!',
	cooldown: 5,
	execute(message, args) {
		if (args.length) {
			return message.reply('The coin command has no arguments!');
		}

		const coins = ['Heads', 'Tails'];
		const winner = coins[Math.floor(Math.random() * coins.length)];
		return message.reply(winner);
	},
};