const fs = require('fs'),
	Discord = require('discord.js'),
	Canvas = require('canvas'),
	Fortnite = require('fortnite-api');

const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const fortnite = new Fortnite(fortniteAPIKey);

const canvas = new Canvas(1000, 800);
const ctx = canvas.getContext('2d');

module.exports = {
	name: 'fort',
	aliases: ['ft'],
	description: 'Fortnite Commands!',
	args: true,
	usage: '[username] [pc/xb1/ps4] | k!fort [status] | k!fort [news]',
	cooldown: 10,
	guildOnly: false,
	execute(message, args) {
		fortnite.login()
			.then(() => {
				if (args[0] === 'status') {
					fortnite.checkFortniteStatus()
						.then(status => {
							if (!status) return message.channel.send('Fortnite is Down! Check https://twitter.com/FortniteGame!');
							message.channel.send('Fortnite is Online!');
						})
						.catch(err => {
							console.log(err);
							message.channel.send('Failed to check Fortnite Status!');
						});
					return;
				}
				if (args[0] === 'news') {
					fortnite.getFortniteNews('en')
						.then(news => {
							const fortNewsEmbed = new Discord.RichEmbed()
								.setColor('DARK_PURPLE')
								.setTitle('Fortnite News')
								.addField(news['br'][0]['title'], news['br'][0]['body'])
								.addField(news['br'][1]['title'], news['br'][1]['body'])
								.addField(news['br'][2]['title'], news['br'][2]['body'])
								.setFooter('@Kaz-Bot')
								.setTimestamp(new Date());
							message.channel.send({ embed: fortNewsEmbed });
						})
						.catch(err => {
							console.log(err);
							message.channel.send('Failed to find Fortnite News!');
						});
					return;
				}
				fortnite.getStatsBR(args[0], args[1] || 'pc')
					.then(stats => {
						ctx.fillStyle = '#000000';
						ctx.fillRect(0, 0, 1000, 150);
						ctx.fillStyle = '#96b5e8';
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
						fs.writeFile('./views/fortChart.png', buf);

						message.channel.send({
							files: [{
								attachment: './views/fortChart.png',
								name: 'fortChart.png',
							}],
						});
					})
					.catch(err => {
						console.log(err);
						message.channel.send('Failed to locate Fortnite Username!');
					});
			})
			.catch(err => {
				console.log(err);
				message.channel.send('Failed to connect to Fortnite Servers!');
			});
	},
};