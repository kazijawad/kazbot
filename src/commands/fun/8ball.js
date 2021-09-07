const { Command } = require('discord.js-commando');

const response = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it, yes',
    'Most likely',
    'Outlook good',
    'Yep',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    'Don\'t count on it',
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
];

class MagicCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'fun',
            memberName: '8ball',
            description: 'Asks the Magic 8-Ball a question.',
            examples: ['8ball Will I win my Fortnite games today?'],
            guildOnly: false,
            args: [
                {
                    key: 'question',
                    prompt: 'What would you like to ask the Magic 8ball?',
                    type: 'string',
                },
            ],
        });
    }

    async run(message) {
        const answer = response[Math.floor(Math.random() * response.length)];
        message.embed({
            color: 0x3498db,
            description: answer,
            footer: {
                text: '@KazBot',
                icon_url: process.env.AVATAR_URL,
            },
            timestamp: new Date(),
            title: 'Magic 8-Ball',
        });
    }
}

module.exports = MagicCommand;
