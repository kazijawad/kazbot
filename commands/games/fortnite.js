const fs = require('fs');
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Canvas = require('canvas');
const Fortnite = require('fortnite-api');

const fortniteAPI = [
	process.env.FORTNITE_EMAIL,
	process.env.FORTNITE_PASS,
	process.env.FORTNITE_LAUNCH,
	process.env.FORTNITE_CLIENT,
];
const fortnite = new Fortnite(fortniteAPI, { debug: true });

const canvas = new Canvas(1000, 800);
const ctx = canvas.getContext('2d');

module.exports = class FortniteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fortnite',
			aliases: ['ft', 'fort'],
			group: 'games',
			memberName: 'fortnite',
			description: 'Shows Fortnite player stats for the specified player.',
			examples: ['ft YellowJay64', 'ft pc YellowJay64', 'ft status', 'ft news'],
			throttling: {
				usages: 2,
				duration: 10,
			},
			guildOnly: false,
			args: [
				{
					key: 'arg',
					prompt: 'What would you like to do with the Fortnite Command?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { arg }) {
		const platformRegex = /^pc|xb1|ps4\s/;
		const platform = arg.match(platformRegex);
		if (!platform) {
			fortnite.login()
				.then(() => {
					switch (arg) {
						case 'status':
							fortnite.checkFortniteStatus()
								.then(status => {
									if (!status) return message.say('Fortnite is Down! Check https://twitter.com/FortniteGame!');
									message.say('Fortnite is Online!');
								})
								.catch(error => {
									console.error(`FORTNITE STATUS: ${error}`);
									message.say('Failed to check Fortnite Status.');
								});
							break;
						case 'news':
							fortnite.getFortniteNews('en')
								.then(news => {
									const fortNewsEmbed = new RichEmbed()
										.setColor('DARK_PURPLE')
										.setTitle('Fortnite News')
										.addField(news['br'][0]['title'], news['br'][0]['body'])
										.addField(news['br'][1]['title'], news['br'][1]['body'])
										.addField(news['br'][2]['title'], news['br'][2]['body'])
										.setFooter('@Kaz-Bot')
										.setTimestamp(new Date());
									message.embed(fortNewsEmbed);
								})
								.catch(error => {
									console.error(`FORTNITE NEWS: ${error}`);
									message.say('Failed to find Fortnite News.');
								});
							break;
						default:
							fortnite.getStatsBR(arg, 'pc')
								.then(stats => {
									this.handleFile(stats);
									message.say({
										files: [{
											attachment: './views/fortnite.png',
											name: 'fortnite.png',
										}],
									});
								})
								.catch(error => {
									console.warn(`FORTNITE STATS: ${error}`);
									message.say('Failed to locate Fortnite Username.');
								});
							break;
					}
				})
				.catch(error => {
					console.error(`FORTNITE LOGIN: ${error}`);
				});
		} else if (platform) {
			let player = platform['input'].split(/pc|xb1|ps4|\s/);
			player = player.slice(2).join(' ');
			fortnite.login()
				.then(() => {
					fortnite.getStatsBR(player, platform[0])
						.then(stats => {
							this.handleFile(stats);
							message.say({
								files: [{
									attachment: './views/fortnite.png',
									name: 'fortnite.png',
								}],
							});
						})
						.catch(error => {
							console.warn(`FORTNITE STATS: ${error}`);
							message.say('Failed to locate Fortnite Username.');
						});
				});
		}
	}

	async handleFile(stats) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 1000, 150);
		ctx.fillStyle = '#743c87';
		ctx.fillRect(0, 150, 1000, 650);
		ctx.font = '50px sans-serif';
		ctx.textAlign = 'left';
		ctx.fillStyle = '#ffffff';

		ctx.fillText(`${stats['info']['username']}`, 70, 70);
		ctx.font = '30px sans-serif';
		ctx.fillText(`${stats['lifetimeStats']['wins']} Wins`, 500, 60);
		ctx.fillText(`${stats['lifetimeStats']['matches']} Matches`, 700, 60);
		ctx.fillText(`${stats['lifetimeStats']['win%']} Win %`, 70, 130);
		ctx.fillText(`${stats['lifetimeStats']['kills']} Kills`, 400, 130);
		ctx.fillText(`${stats['lifetimeStats']['k/d']} K/D`, 730, 130);

		ctx.fillStyle = '#000000';
		ctx.font = '40px sans-serif';
		ctx.fillText('Solo', 70, 200);
		ctx.font = '30px sans-serif';
		ctx.fillText(`${stats['group']['solo']['wins']} Wins`, 70, 260);
		ctx.fillText(`${stats['group']['solo']['matches']} Matches`, 400, 260);
		ctx.fillText(`${stats['group']['solo']['kills']} Kills`, 730, 260);
		ctx.fillText(`${stats['group']['solo']['win%']} Win %`, 70, 300);
		ctx.fillText(`${stats['group']['solo']['timePlayed']} Playtime`, 400, 300);
		ctx.fillText(`${stats['group']['solo']['k/d']} K/D`, 730, 300);

		ctx.font = '40px sans-serif';
		ctx.fillText('Duo', 70, 400);
		ctx.font = '30px sans-serif';
		ctx.fillText(`${stats['group']['duo']['wins']} Wins`, 70, 460);
		ctx.fillText(`${stats['group']['duo']['matches']} Matches`, 400, 460);
		ctx.fillText(`${stats['group']['duo']['kills']} Kills`, 730, 460);
		ctx.fillText(`${stats['group']['duo']['win%']} Win %`, 70, 500);
		ctx.fillText(`${stats['group']['duo']['timePlayed']} Playtime`, 400, 500);
		ctx.fillText(`${stats['group']['duo']['k/d']} K/D`, 730, 500);

		ctx.font = '40px sans-serif';
		ctx.fillText('Squad', 70, 600);
		ctx.font = '30px sans-serif';
		ctx.fillText(`${stats['group']['squad']['wins']} Wins`, 70, 660);
		ctx.fillText(`${stats['group']['squad']['matches']} Matches`, 400, 660);
		ctx.fillText(`${stats['group']['squad']['kills']} Kills`, 730, 660);
		ctx.fillText(`${stats['group']['squad']['win%']} Win %`, 70, 700);
		ctx.fillText(`${stats['group']['squad']['timePlayed']} Playtime`, 400, 700);
		ctx.fillText(`${stats['group']['squad']['k/d']} K/D`, 730, 700);

		const dataURL = canvas.toDataURL();
		const data = dataURL.replace(/^data:image\/\w+;base64,/, '');
		const buf = new Buffer(data, 'base64');
		fs.writeFile('./views/fortnite.png', buf, (error) => {
			if (error) console.error(`FORTNITE CANVAS: ${error}`);
		});
	}
};
