module.exports = {
	name: 'stop',
	aliases: ['quit'],
	description: 'Stop the music player!',
	cooldown: 5,
	guildOnly: true,
	execute(message) {
		const voiceChannel = message.guild.me.voiceChannel;
		voiceChannel.leave();
	},
};