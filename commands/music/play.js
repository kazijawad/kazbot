const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');

const youtube = new Youtube(process.env.YOUTUBE_API);

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Plays music from Youtube.',
			examples: ['play https://www.youtube.com/watch?v=mOKqNxN4jWM'],
			guildOnly: true,
			clientPermissions: ['CONNECT', 'SPEAK'],
			args: [
				{
					key: 'arg',
					prompt: 'What song would you like to play?',
					type: 'string',
				},
			],
		});

		this.queue = new Map();
	}

	async run(message, { arg }) {
		const url = arg.replace(/<(.+)>/g, '$1');
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const videoID = await youtube.getVideoByID(video.id);
				await this.handleVideo(message, videoID, true);
			}
			return message.say(`Playlist: ${playlist.title} has been added to the queue.`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(url, 1);
					video = await youtube.getVideoByID(videos[0].id);
				} catch (err) {
					return message.say('Failed to find Youtube video.');
				}
			}
			return this.handleVideo(message, video);
		}
	}

	async handleVideo(message, video, playlist = false) {
		const guildQueue = this.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;
		const song = {
			id: video.id,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`,
		};

		if (!voiceChannel) return message.reply('Please join a voice channel first!');
		if (!guildQueue) {
			const queueConstruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
			};
			this.queue.set(message.guild.id, queueConstruct);
			queueConstruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				this.play(message.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`Play Error: ${error}`);
				this.queue.delete(message.guild.id);
				return message.say('Failed to join the voice channel.');
			}
		} else {
			guildQueue.songs.push(song);
			if (playlist) return;
			message.say(`${song.title} has been added to the queue.`);
		}
	}

	async play(guild, song) {
		const guildQueue = this.queue.get(guild.id);
		if (!song) {
			guildQueue.voiceChannel.leave();
			guildQueue.textChannel.send(`Kaz Bot has left ${guildQueue.voiceChannel.name}`);
			this.queue.delete(guild.id);
			return;
		}

		const stream = ytdl(song.url, { filter: 'audioonly' });
		const dispatcher = guildQueue.connection.playStream(stream)
			.on('start', () => {
				guildQueue.textChannel.send(`Start Playing: ${song.title}`);
			})
			.on('end', () => {
				guildQueue.songs.shift();
				this.play(guild, guildQueue.songs[0]);
			})
			.on('error', error => console.error(`Dispatcher Error: ${error}`));
		dispatcher.setVolumeLogarithmic(guildQueue.volume / 5);
	}
};
