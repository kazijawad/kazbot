const { Command } = require('discord.js-commando');

module.exports = class StopCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'music',
			memberName: 'stop',
			description: 'Stops the music playing.',
			examples: ['stop'],
			guildOnly: true,
		});
	}

	async run(message) {
		const voiceChannel = message.guild.me.voiceChannel;
		if (!voiceChannel) return message.say('Kaz Bot is not in a Voice Channel!');

		voiceChannel.leave();
	}
};
