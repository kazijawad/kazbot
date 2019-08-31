const { Command } = require('discord.js-commando');

class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			group: 'music',
			memberName: 'resume',
			description: 'Resumes the current song.',
			examples: ['resume'],
			guildOnly: true,
		});
	}

	async run(message) {
		const queue = this.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;

		if (!queue) {
			return message.embed({
				color: 0x8e44ad,
				description: 'There is no queue available right now.',
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Song Status',
			});
		} else if (queue.playing) {
			return message.embed({
				color: 0x8e44ad,
				description: 'The song is playing!',
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

		queue.connection.dispatcher.resume();
		queue.playing = true;
		message.embed({
			color: 0x8e44ad,
			description: `Resumed ${queue.songs[0].title}`,
			footer: {
				text: '@KazBot',
				icon_url: process.env.AVATAR_URL,
			},
			timestamp: new Date(),
			title: 'Song Status',
		});
	}

	get queue() {
		if (!this._queue) { this._queue = this.client.registry.resolveCommand('music:play').queue; }
		return this._queue;
	}
}

module.exports = ResumeCommand;
