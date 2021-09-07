const { Command } = require('discord.js-commando');

class SongCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'song',
            group: 'music',
            memberName: 'song',
            description: 'Displays the song currently playing.',
            examples: ['song'],
            guildOnly: true,
        });
    }

    async run(message) {
        const queue = this.queue.get(message.guild.id);
        if (!queue) {
            return message.embed({
                color: 0x8e44ad,
                description: 'There is no music playing right now.',
                footer: {
                    text: '@KazBot',
                    icon_url: process.env.AVATAR_URL,
                },
                timestamp: new Date(),
                title: 'Song Information',
            });
        }

        message.embed({
            color: 0x8e44ad,
            description: `Now Playing: ${queue.songs[0].title}`,
            footer: {
                text: '@KazBot',
                icon_url: process.env.AVATAR_URL,
            },
            timestamp: new Date(),
            title: 'Song Information',
        });
    }

    get queue() {
        if (!this._queue) { this._queue = this.client.registry.resolveCommand('music:play').queue; }
        return this._queue;
    }
}

module.exports = SongCommand;
