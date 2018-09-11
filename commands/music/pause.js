const { Command } = require('discord.js-commando');

class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			group: 'music',
			memberName: 'pause',
			description: 'Pauses the current song.',
			examples: ['pause'],
			guildOnly: true,
		});
	}

	async run(message) {
		const queue = this.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;

		if (!queue) return message.reply('There is no queue available right now.');
		if (!queue.playing) return message.reply('There is no music playing right now.');
		if (!voiceChannel) return message.reply('Please join a voice channel first!');

		queue.connection.dispatcher.pause();
		queue.playing = false;
		message.say(`\`\`\`Paused ${queue.songs[0].title}\`\`\``);
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
		return this._queue;
	}
}

module.exports = PauseCommand;
