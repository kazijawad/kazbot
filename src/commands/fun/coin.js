const { Command } = require('discord.js-commando');

const coins = ['Heads', 'Tails'];

class CoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coin',
            aliases: ['toss'],
            group: 'fun',
            memberName: 'coin',
            description: 'Tosses a coin.',
            examples: ['coin', 'toss'],
            guildOnly: false,
        });
    }

    async run(message) {
        const winner = coins[Math.floor(Math.random() * coins.length)];
        message.embed({
            color: 0x3498db,
            description: winner,
            footer: {
                text: '@KazBot',
                icon_url: process.env.AVATAR_URL,
            },
            timestamp: new Date(),
            title: 'Coin Toss',
        });
    }
}

module.exports = CoinCommand;
