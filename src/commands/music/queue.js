const { Command } = require('discord.js-commando');

class QueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			group: 'music',
			memberName: 'queue',
			description: 'Displays the queue of songs.',
			examples: ['queue'],
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
				title: 'Song Status',
			});
		}

		message.say(`\`\`\`Song Queue:\n${queue.songs.map(song => song.title).join('\n')}\n\nNow Playing: ${queue.songs[0].title}\`\`\``);
	}

	get queue() {
		if (!this._queue) { this._queue = this.client.registry.resolveCommand('music:play').queue; }
		return this._queue;
	}
}

module.exports = QueueCommand;
