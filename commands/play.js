const Discord = require('discord.js');
const Youtube = require('youtube-node');
const Ytdl = require('ytdl-core');

const youtube = new Youtube();
youtube.setKey(process.env.youtubeAPIKey);

const songTitle = [' '];
const songAuthor = [' '];

module.exports = {
	name: 'play',
	aliases: ['yt'],
	description: 'Play music from Youtube!',
	args: true,
	usage: '[SONG NAME]',
	cooldown: 10,
	guildOnly: true,
	execute(message, args) {
		const arg = args.join(' ');
		const memberChannel = message.member.voiceChannel;
		const botChannel = message.guild.me.voiceChannel;

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

				const songEmbed = new Discord.RichEmbed()
					.setColor('AQUA')
					.setTitle('Song List:')
					.setDescription('Please respond with a number!')
					.addField('1: ' + songTitle[1], songAuthor[1])
					.addField('2: ' + songTitle[2], songAuthor[2])
					.addField('3: ' + songTitle[3], songAuthor[3])
					.addField('4: ' + songTitle[4], songAuthor[4])
					.addField('5: ' + songTitle[5], songAuthor[5])
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());

				const filter = response => response.content.match(/1|2|3|4|5/);

				message.channel.send(songEmbed)
					.then(() => {
						message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000 })
							.then(collected => {
								const response = collected.map(c => c.content).toString();
								const song = response - 1;
								const video = result.items[song].id.videoId;
								const url = 'https://www.youtube.com/watch?v=' + video;
								memberChannel.join()
									.then(connection => {
										const stream = Ytdl(url, { filter: 'audioonly' });
										const dispatcher = connection.playStream(stream);
										message.channel.send(':musical_note: Now Playing: ' + songTitle[response] + ':musical_note:');
										dispatcher.on('end', () => {
											memberChannel.leave();
											return message.channel.send('Kaz Bot has left ' + memberChannel.name);
										});
									})
									.catch(() => {
										return message.channel.send('Unable to stream from Youtube!');
									});
							})
							.catch(() => {
								return message.channel.send('There was an error in your response!');
							});
					});
			});
		}
		else {
			return message.reply('Kaz Bot is already in a voice channel!');
		}
	},
};