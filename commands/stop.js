module.exports = {
	name: 'stop',
	aliases: ['quit'],
	description: 'Stop the music player!',
	args: false,
	cooldown: 5,
	guildOnly: true,
	execute(message) {
		const voiceChannel = message.guild.me.voiceChannel;
		if (!voiceChannel) {
			return message.channel.send('Kaz Bot is not in a Voice Channel!');
		}
		return voiceChannel.leave();
	},
};