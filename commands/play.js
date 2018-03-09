const Youtube = require('youtube-node');
const ytdl = require('ytdl-core');
const youtube = new Youtube();

youtube.setKey(process.env.youtubeAPIKey);

module.exports = {
	name: 'play',
	aliases: ['youtube'],
	description: 'Play music from Youtube!',
	args: true,
	cooldown: 5,
	usage: '[SEARCH QUERY]',
	guildOnly: true,
	execute(message, args) {
		youtube.search(args[0], 1, (err, result) => {
			const video = result.items[0].id.videoId;
			const url = 'https://www.youtube.com/watch?v=' + video;
			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return message.reply('Please join a voice channel first!');
			}

			voiceChannel.join().then(connection => {
				const stream = ytdl(url, { filter: 'audioonly' });
				const dispatcher = connection.playStream(stream);

				dispatcher.on('end', () => voiceChannel.leave());
			});
		});
	},
};