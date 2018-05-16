const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
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

		if (!queue) return message.reply('There is no queue available right now.');
		if (queue.playing) return message.reply('The song is playing!');
		if (!voiceChannel) return message.reply('Please join a voice channel first!');

		queue.connection.dispatcher.resume();
		queue.playing = true;
		message.say(`\`\`\`Resumed ${queue.songs[0].title}\`\`\``);
	}

	get queue() {
		if (!this._queue) this._queue = this.client.registry.resolveCommand('music:play').queue;
		return this._queue;
	}
};
