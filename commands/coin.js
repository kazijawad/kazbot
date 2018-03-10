module.exports = {
	name: 'coin',
	aliases: ['toss'],
	description: 'Toss a coin!',
	cooldown: 5,
	execute(message) {
		const coins = ['Heads', 'Tails'];
		const winner = coins[Math.floor(Math.random() * coins.length)];
		message.reply(winner);
	},
};