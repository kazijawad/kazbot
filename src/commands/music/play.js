const { Command } = require('discord.js-commando');
const { Util } = require('discord.js');
const ytdlDiscord = require('ytdl-core-discord');
const Youtube = require('simple-youtube-api');

const youtube = new Youtube(process.env.YOUTUBE_API);

class PlayCommand extends Command {
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

            return message.embed({
                color: 0x8e44ad,
                description: `Playlist: ${playlist.title} has been added to the queue.`,
                footer: {
                    text: '@KazBot',
                    icon_url: process.env.AVATAR_URL,
                },
                timestamp: new Date(),
                title: 'Playlist Added',
            });
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(url, 5);
                    const songTitle = [];
                    const songChannel = [];
                    videos.forEach(element => {
                        songTitle.push(element.title);
                        songChannel.push(element.channel.title);
                    });

                    message.embed({
                        color: 0x8e44ad,
                        description: 'Please respond with a number.',
                        fields: [
                            {
                                name: `1: ${songTitle[0]}`,
                                value: songChannel[0],
                            },
                            {
                                name: `2: ${songTitle[1]}`,
                                value: songChannel[1],
                            },
                            {
                                name: `3: ${songTitle[2]}`,
                                value: songChannel[2],
                            },
                            {
                                name: `4: ${songTitle[3]}`,
                                value: songChannel[3],
                            },
                            {
                                name: `5: ${songTitle[4]}`,
                                value: songChannel[4],
                            },
                        ],
                        footer: {
                            text: '@KazBot',
                            icon_url: process.env.AVATAR_URL,
                        },
                        timestamp: new Date(),
                        title: 'Song Selection',
                    });

                    try {
                        const filter = response => response.content.match(/1|2|3|4|5/);
                        var response = await message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time'] });
                    } catch (error) {
                        return message.embed({
                            color: 0x8e44ad,
                            description: 'Failed to receive a value from the user.',
                            footer: {
                                text: '@KazBot',
                                icon_url: process.env.AVATAR_URL,
                            },
                            timestamp: new Date(),
                            title: 'Song Selection',
                        });
                    }
                    const videoIndex = parseInt(response.first().content);
                    video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (error) {
                    return message.embed({
                        color: 0x8e44ad,
                        description: 'Failed to find a Youtube video.',
                        footer: {
                            text: '@KazBot',
                            icon_url: process.env.AVATAR_URL,
                        },
                        timestamp: new Date(),
                        title: 'Song Selection',
                    });
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

        if (!voiceChannel) {
            return message.embed({
                color: 0x8e44ad,
                description: 'Please join a voice channel first!',
                footer: {
                    text: '@KazBot',
                    icon_url: process.env.AVATAR_URL,
                },
                timestamp: new Date(),
                title: 'Song Selection',
            });
        } else if (!guildQueue) {
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
                console.error(`[PLAY] ${error}`);
                this.queue.delete(message.guild.id);
                return message.embed({
                    color: 0x8e44ad,
                    description: 'Failed to join the voice channel.',
                    footer: {
                        text: '@KazBot',
                        icon_url: process.env.AVATAR_URL,
                    },
                    timestamp: new Date(),
                    title: 'Song Selection',
                });
            }
        } else {
            guildQueue.songs.push(song);
            if (playlist) { return; }
            message.embed({
                color: 0x8e44ad,
                description: `${song.title} has been added to the queue.`,
                footer: {
                    text: '@KazBot',
                    icon_url: process.env.AVATAR_URL,
                },
                timestamp: new Date(),
                title: 'Song Selection',
            });
        }
    }

    async play(guild, song) {
        const guildQueue = this.queue.get(guild.id);
        if (!song) {
            guildQueue.voiceChannel.leave();
            guildQueue.textChannel.send(undefined, {
                embed: {
                    color: 0x8e44ad,
                    description: `KazBot has left ${guildQueue.voiceChannel.name}`,
                    footer: {
                        text: '@KazBot',
                        icon_url: process.env.AVATAR_URL,
                    },
                    timestamp: new Date(),
                    title: 'Song Selection',
                },
            });

            this.queue.delete(guild.id);
            return;
        }

        const stream = await ytdlDiscord(song.url);
        const dispatcher = guildQueue.connection.playOpusStream(stream, { passes: 3 })
            .on('start', () => {
                guildQueue.textChannel.send(undefined, {
                    embed: {
                        color: 0x8e44ad,
                        description: `Playing: ${song.title}`,
                        footer: {
                            text: '@KazBot',
                            icon_url: process.env.AVATAR_URL,
                        },
                        timestamp: new Date(),
                        title: 'Song Selection',
                    },
                });
            })
            .on('end', () => {
                guildQueue.songs.shift();
                this.play(guild, guildQueue.songs[0]);
            })
            .on('error', error => console.error(`[DISPATCHER] ${error}`));
        dispatcher.setVolumeLogarithmic(guildQueue.volume / 5);
    }
}

module.exports = PlayCommand;
