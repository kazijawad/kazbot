const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
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

		if (!queue) return message.reply('There is no music playing right now.');
		if (!voiceChannel) return message.say('Please join a voice channel first!');

		queue.connection.dispatcher.end();
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
		return this._queue;
	}
};
