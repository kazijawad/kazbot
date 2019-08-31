const { Command } = require('discord.js-commando');

class VolumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			aliases: ['vol'],
			group: 'music',
			memberName: 'volume',
			description: 'Sets the current volume for KazBot.',
			examples: ['volume'],
			guildOnly: true,
			args: [
				{
					key: 'level',
					prompt: 'What would you like to set the volume at?',
					type: 'integer',
					default: '',
				},
			],
		});
	}

	async run(message, { level }) {
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
				title: 'Song Information',
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
				title: 'Song Information',
			});
		}

		if (level === '') {
			return message.embed({
				color: 0x8e44ad,
				description: `Current Volume: ${queue.volume}`,
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Song Information',
			});
		} else {
			queue.connection.dispatcher.setVolumeLogarithmic(level / 5);
			queue.volume = level;
			message.embed({
				color: 0x8e44ad,
				description: `Current Volume: ${queue.volume}`,
				footer: {
					text: '@KazBot',
					icon_url: process.env.AVATAR_URL,
				},
				timestamp: new Date(),
				title: 'Song Information',
			});
		}
	}

	get queue() {
		if (!this._queue) { this._queue = this.client.registry.resolveCommand('music:play').queue; }
		return this._queue;
	}
}

module.exports = VolumeCommand;
