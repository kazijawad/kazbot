const discord = require('discord.js');
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
		const choice = ['1', '2', '3', '4', '5'];
		const songTitle = [];
		const songAuthor = [];

		if (!memberChannel) {
			return message.reply('Please join a voice channel first!');
		}

		if (botChannel === undefined) {
			youtube.search(arg, 5, (err, result) => {
				const data = result.items;
				data.forEach((element) => {
					songTitle.push(element.snippet.title);
					songAuthor.push(element.snippet.channelTitle);
				});

				const songEmbed = new discord.RichEmbed()
					.setColor('BLUE')
					.setTitle('Song List')
					.addField(songTitle[0], songAuthor[0])
					.addField(songTitle[1], songAuthor[1])
					.addField(songTitle[2], songAuthor[2])
					.addField(songTitle[3], songAuthor[3])
					.addField(songTitle[4], songAuthor[4])
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());

				const filter = response => response.content.includes(choice[1]);

				message.channel.send(songEmbed).then(() => {
					message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000 })
						.then(() => {
							message.channel.send(`${songTitle[0]} selected!`);
						})
						.catch(() => {
							message.channel.send('There was an error in your response!');
						});
				});


				// const video = result.items[0].id.videoId;
				// const url = 'https://www.youtube.com/watch?v=' + video;

				// memberChannel.join()
				// 	.then(connection => {
				// 		const stream = ytdl(url, { filter: 'audioonly' });
				// 		const dispatcher = connection.playStream(stream);
				// 		message.channel.send('Now Playing: ' + arg);
				// 		dispatcher.on('end', () => {
				// 			memberChannel.leave();
				// 			message.channel.send('Kaz Bot has left ' + memberChannel.name);
				// 		});
				// 	});
			});
		}
		else {
			return message.reply('Kaz Bot is already in a voice channel!');
		}
	},
};