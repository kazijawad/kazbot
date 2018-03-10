const discord = require('discord.js');
const fortnite = require('fortnite-api');

const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const fortniteAPI = new fortnite(fortniteAPIKey);

module.exports = {
	name: 'fort',
	aliases: ['fortnite', 'ft'],
	description: 'Shows all Fortnite Player Stats',
	args: true,
	usage: '[USERNAME] [PLATFORM]',
	cooldown: 10,
	execute(message, args) {
		fortniteAPI.login().then(() => {
			fortniteAPI.getStatsBR(args[0], args[1] || 'pc')
				.then((stats) => {
					const fortStats = new discord.RichEmbed()
						.setColor('PURPLE')
						.setTitle(stats['info']['username'] + '\'s Fortnite Stats')
						.addField('Total Wins', stats['lifetimeStats']['wins'], true)
						.addField('Total Kills', stats['lifetimeStats']['kills'], true)
						.addField('Total Matches', stats['lifetimeStats']['matches'], true)
						.addField('Total Playtime', stats['lifetimeStats']['timePlayed'], true)
						.setFooter('@Kaz-Bot')
						.setTimestamp(new Date());
					message.channel.send({ embed: fortStats });
				})
				.catch((err) => {
					console.log(err);
					message.channel.send('Cannot retrieve Player Stats!');
				});
		});
	},
};