const { Command } = require('discord.js-commando');

class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skips the music currently playing.',
            examples: ['skip'],
            guildOnly: true,
        });
    }

    async run(message) {
        const queue = this.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;

        if (!queue) {
            return message.embed({
                color: 0x8e44ad,
                description: 'There is no music playing right now.',
                footer: {
                    text: '@KazBot',
                    icon_url: process.env.AVATAR_URL,
                },
                timestamp: new Date(),
                title: 'Song Status',
            });
        } else if (!voiceChannel) {
            return message.embed({
                color: 0x8e44ad,
                description: 'Please join a voice channel first!',
                footer: {
                    text: '@KazBot',
                    icon_url: process.env.AVATAR_URL,
                },
                timestamp: new Date(),
                title: 'Song Status',
            });
        }

        queue.connection.dispatcher.end();
    }

    get queue() {
        if (!this._queue) { this._queue = this.client.registry.resolveCommand('music:play').queue; }
        return this._queue;
    }
}

module.exports = SkipCommand;
