const fortnite = require('fortnite-api');
const discord = require('discord.js');

const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const fortniteAPI = new fortnite(fortniteAPIKey);

module.exports = {
	name: 'fortnews',
	aliases: ['fortnews', 'ftnews'],
	description: 'Shows the latest Fortnite News!',
	cooldown: 10,
	execute(message) {
		fortniteAPI.login().then(() => {
			fortniteAPI.getFortniteNews('en')
				.then((news) => {
					const fortNews = new discord.RichEmbed()
						.setColor('DARK_PURPLE')
						.setTitle('Fortnite News')
						.addField(news['loginmessage']['title'], news['loginmessage']['body'])
						.setFooter('@Kaz-Bot');
					message.channel.send({ embed: fortNews });
				})
				.catch((err) => {
					console.log(err);
					message.channel.send('Unable to find Fortnite News!');
				});
		});
	},
};