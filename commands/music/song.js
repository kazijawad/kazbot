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
		if (!queue) return message.reply('There is no music playing right now.');

		message.say(`Now Playing: ${queue.songs[0].title}`);
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
		return this._queue;
	}
}

module.exports = SongCommand;
