const { Command } = require('discord.js-commando');

class ServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            aliases: ['guild'],
            group: 'utilities',
            memberName: 'server',
            description: 'Retrieves Server Information.',
            examples: ['server'],
            guildOnly: true,
        });
    }

    async run(message) {
        const afkChannel = message.guild.afkChannel ? message.guild.afkChannel.name : 'N/A';
        message.embed({
            color: 0xf39c12,
            fields: [
                {
                    name: 'Guild ID',
                    value: message.guild.id,
                    inline: true,
                },
                {
                    name: 'Guild Owner',
                    value: message.guild.owner.displayName,
                    inline: true,
                },
                {
                    name: 'Guild Region',
                    value: message.guild.region,
                    inline: true,
                },
                {
                    name: 'Member Count',
                    value: message.guild.memberCount,
                    inline: true,
                },
                {
                    name: 'Default Role',
                    value: message.guild.defaultRole.name,
                    inline: true,
                },
                {
                    name: 'AFK Channel',
                    value: afkChannel,
                    inline: true,
                },
                {
                    name: 'Creation',
                    value: message.guild.createdAt,
                    inline: true,
                },
            ],
            footer: {
                text: '@KazBot',
                icon_url: process.env.AVATAR_URL,
            },
            timestamp: new Date(),
            title: `${message.guild.name}'s Guild Information`,
        });
    }
}

module.exports = ServerCommand;
