const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'music',
			memberName: 'play',
			description: 'Kaz Bot will play music from Youtube.',
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
		const guildQueue = this.queue.get(message.guild.id);
		const voiceChannel = message.member.voiceChannel;
		const songInfo = await ytdl.getInfo(arg);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
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
			message.say(`${song.title} has been added to the queue.`);
		}
		return undefined;
	}

	async play(guild, song) {
		const guildQueue = this.queue.get(guild.id);
		if (!song) {
			guildQueue.voiceChannel.leave();
			this.queue.delete(guild.id);
			return;
		}

		const stream = ytdl(song.url, { filter: 'audioonly' });
		const dispatcher = guildQueue.connection.playStream(stream)
			.on('end', () => {
				guildQueue.songs.shift();
				this.play(guild, guildQueue.songs[0]);
			})
			.on('error', error => console.error(`Dispatcher Error: ${error}`));
		dispatcher.setVolumeLogarithmic(guildQueue.volume / 5);
	}
};
