const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Youtube = require('youtube-node');
const ytdl = require('ytdl-core');

const youtube = new Youtube();
youtube.setKey(process.env.YOUTUBE_API);

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Plays music from Youtube.',
			examples: ['play The Campfire Song'],
			guildOnly: true,
			args: [
				{
					key: 'song',
					prompt: 'What song would you like to play?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { song }) {
		const memberChannel = message.member.voiceChannel;
		const botChannel = message.guild.me.voiceChannel;
		const songTitle = [' '];
		const songAuthor = [' '];

		if (!memberChannel) return message.reply('Please join a voice channel first!');

		if (!botChannel) {
			youtube.search(song, 5, (err, result) => {
				if (err) {
					return message.say('Failed to search Youtube!');
				}
				const data = result.items;
				data.forEach((element) => {
					songTitle.push(element.snippet.title);
					songAuthor.push(element.snippet.channelTitle);
				});

				const songEmbed = new RichEmbed()
					.setColor('AQUA')
					.setTitle('Song List')
					.setDescription('Please respond with a number:')
					.addField('1: ' + songTitle[1], songAuthor[1])
					.addField('2: ' + songTitle[2], songAuthor[2])
					.addField('3: ' + songTitle[3], songAuthor[3])
					.addField('4: ' + songTitle[4], songAuthor[4])
					.addField('5: ' + songTitle[5], songAuthor[5])
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());

				const filter = response => response.content.match(/1|2|3|4|5/);

				message.embed(songEmbed)
					.then(() => {
						message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000 })
							.then(collected => {
								const response = collected.map(c => c.content).toString();
								const request = response - 1;
								const video = result.items[request].id.videoId;
								const url = 'https://www.youtube.com/watch?v=' + video;
								memberChannel.join()
									.then(connection => {
										const stream = ytdl(url, { filter: 'audioonly' });
										const dispatcher = connection.playStream(stream);
										message.say(':musical_note: Now Playing: ' + songTitle[response] + ':musical_note:');
										dispatcher.on('end', () => {
											memberChannel.leave();
											message.say('Kaz Bot has left ' + memberChannel.name);
										});
									})
									.catch(() => {
										message.say('Failed to stream from Youtube!');
									});
							})
							.catch(() => {
								message.say('There was an error in your response!');
							});
					});
			});
		} else {
			message.reply('Kaz Bot is already in a voice channel!');
		}
	}
};
