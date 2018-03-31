const { Command } = require('discord.js-commando');

const coins = ['Heads', 'Tails'];

module.exports = class CoinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'coin',
			aliases: ['toss'],
			group: 'fun',
			memberName: 'coin',
			description: 'Tosses a coin.',
			example: ['coin', 'toss'],
			guildOnly: false,
		});
	}

	async run(message) {
		const winner = coins[Math.floor(Math.random() * coins.length)];
		message.reply(winner);
	}
};