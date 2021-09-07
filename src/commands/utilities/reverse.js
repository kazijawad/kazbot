const { Command } = require('discord.js-commando');

class ReverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reverse',
            group: 'utilities',
            memberName: 'reverse',
            description: 'Reverses any string passed through.',
            examples: ['reverse test'],
            guildOnly: false,
            args: [
                {
                    key: 'string',
                    prompt: 'What would you like to reverse',
                    type: 'string',
                },
            ],
        });
    }

    async run(message, { string }) {
        const reverse = string.split('').reverse().join('');

        message.embed({
            color: 0xf39c12,
            description: `${string} ➡️ ${reverse}`,
            footer: {
                text: '@KazBot',
                icon_url: process.env.AVATAR_URL,
            },
            timestamp: new Date(),
            title: 'Reverse Command',
        });
    }
}

module.exports = ReverseCommand;
