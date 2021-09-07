const { Command } = require('discord.js-commando');

class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['icon'],
            group: 'utilities',
            memberName: 'avatar',
            description: 'Retrieves Discord Avatar for the specificed User.',
            examples: ['avatar @YellowJay#5984'],
            guildOnly: false,
            args: [
                {
                    key: 'user',
                    prompt: 'What user avatar would you like to see?',
                    type: 'user',
                    default: 'undefined',
                },
            ],
        });
    }

    async run(message, { user }) {
        if (user === 'undefined') { user = message.author; }

        message.embed({
            color: 0xf39c12,
            image: {
                url: user.avatarURL,
            },
            footer: {
                text: '@KazBot',
                icon_url: process.env.AVATAR_URL,
            },
            timestamp: new Date(),
            title: `${user.username}'s Avatar`,
        });
    }
}

module.exports = AvatarCommand;
