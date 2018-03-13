const Youtube = require('youtube-node');
const ytdl = require('ytdl-core');
const youtube = new Youtube();

youtube.setKey(process.env.youtubeAPIKey);

module.exports = {
	name: 'play',
	aliases: ['yt', 'youtube'],
	description: 'Play music from Youtube!',
	args: true,
	usage: '[SONG NAME]',
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		const arg = args.join(' ');
		const memberChannel = message.member.voiceChannel;
		const botChannel = message.guild.me.voiceChannel;

		if (!memberChannel) {
			return message.reply('Please join a voice channel first!');
		}

		if (botChannel === undefined) {
			youtube.search(arg, 1, (err, result) => {
				const video = result.items[0].id.videoId;
				const url = 'https://www.youtube.com/watch?v=' + video;

				memberChannel.join()
					.then(connection => {
						const stream = ytdl(url, { filter: 'audioonly' });
						const dispatcher = connection.playStream(stream);
						message.channel.send('Now Playing: ' + arg);
						dispatcher.on('end', () => {
							memberChannel.leave();
							message.channel.send('Kaz Bot has left ' + memberChannel.name);
						});
					});
			});
		}
		else {
			return message.reply('Kaz Bot is already in a voice channel!');
		}
	},
};