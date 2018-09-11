const { Command } = require('discord.js-commando');

class StopCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'music',
			memberName: 'stop',
			description: 'Stops the music and leave the voice channel.',
			examples: ['stop'],
			guildOnly: true,
		});
	}

	async run(message) {
		const queue = this.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;

		if (!queue) return message.reply('There is no music playing right now.');
		if (!voiceChannel) return message.say('Please join a voice channel first!');

		queue.songs = [];
		queue.connection.dispatcher.end();
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
		return this._queue;
	}
}

module.exports = StopCommand;
