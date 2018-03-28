const Discord = require('discord.js');
const Fortnite = require('fortnite-api');

const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const fortniteAPI = new Fortnite(fortniteAPIKey);

module.exports = {
	name: 'fortnews',
	aliases: ['ftnews'],
	description: 'Shows the latest Fortnite News!',
	args: false,
	cooldown: 10,
	guildOnly: false,
	execute(message) {
		fortniteAPI.login()
			.then(() => {
				fortniteAPI.getFortniteNews('en')
					.then(news => {
						const fortNewsEmbed = new Discord.RichEmbed()
							.setColor('DARK_PURPLE')
							.setTitle('Fortnite News')
							.addField(news['br'][0]['title'], news['br'][0]['body'])
							.addField(news['br'][1]['title'], news['br'][1]['body'])
							.addField(news['br'][2]['title'], news['br'][2]['body'])
							.setFooter('@Kaz-Bot')
							.setTimestamp(new Date());
						return message.channel.send({ embed: fortNewsEmbed });
					})
					.catch(err => {
						console.log(err);
						return message.channel.send('Unable to find Fortnite News!');
					});
			})
			.catch(err => {
				console.log(err);
				return message.channel.send('Unable to connect to Fortnite Servers!');
			});
	},
};