const { Command } = require('discord.js-commando');

class VolumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'volume',
			aliases: ['vol'],
			group: 'music',
			memberName: 'volume',
			description: 'Sets the current volume for Kaz Bot.',
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

		if (!queue) return message.reply('There is no music playing right now.');
		if (!voiceChannel) return message.say('Please join a voice channel first!');

		if (level === '') {
			return message.say(`Current Volume: ${queue.volume}`);
		} else {
			queue.connection.dispatcher.setVolumeLogarithmic(level / 5);
			queue.volume = level;
			message.say(`Current Volume: ${queue.volume}`);
		}
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
		return this._queue;
	}
}

module.exports = VolumeCommand;
