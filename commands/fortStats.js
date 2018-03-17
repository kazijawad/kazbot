const discord = require('discord.js');
const fortnite = require('fortnite-api');

const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const fortniteAPI = new fortnite(fortniteAPIKey);

module.exports = {
	name: 'fort',
	aliases: ['fortnite', 'ft'],
	description: 'Shows all Fortnite Player Stats',
	args: true,
	usage: '[USERNAME] [PC/XB1/PS4]',
	cooldown: 10,
	guildOnly: false,
	execute(message, args) {
		fortniteAPI.login()
			.then(() => {
				fortniteAPI.getStatsBR(args[0], args[1] || 'pc')
					.then((stats) => {
						const fortStats = new discord.RichEmbed()
							.setColor('PURPLE')
							.setTitle(stats['info']['username'] + '\'s Fortnite Stats')
							.addField('Overall', `Total Wins: ${stats['lifetimeStats']['wins']}\nWin Percentage: ${stats['lifetimeStats']['win%']}\nTotal Kills: ${stats['lifetimeStats']['kills']}\nK/D: ${stats['lifetimeStats']['k/d']}\nKills Per Minute: ${stats['lifetimeStats']['killsPerMin']}\nTotal Matches: ${stats['lifetimeStats']['matches']}\nTotal Playtime: ${stats['lifetimeStats']['timePlayed']}`, true)
							.addBlankField(true)
							.addField('Solo', `Wins: ${stats['group']['solo']['wins']}\nWin Percentage: ${stats['group']['solo']['win%']}\nTop 10: ${stats['group']['solo']['top10']}\nTop 25: ${stats['group']['solo']['top25']}\nKills: ${stats['group']['solo']['kills']}\nK/D: ${stats['group']['solo']['k/d']}\nKills Per Minute: ${stats['group']['solo']['killsPerMin']}\nKills Per Match: ${stats['group']['solo']['killsPerMatch']}\nMatches: ${stats['group']['solo']['matches']}\nPlaytime: ${stats['group']['solo']['timePlayed']}`, true)
							.addField('Duo', `Wins: ${stats['group']['duo']['wins']}\nWin Percentage: ${stats['group']['duo']['win%']}\nTop 5: ${stats['group']['duo']['top5']}\nTop 12: ${stats['group']['duo']['top12']}\nKills: ${stats['group']['duo']['kills']}\nK/D: ${stats['group']['duo']['k/d']}\nKills Per Minute: ${stats['group']['duo']['killsPerMin']}\nKills Per Match: ${stats['group']['duo']['killsPerMatch']}\nMatches: ${stats['group']['duo']['matches']}\nPlaytime: ${stats['group']['duo']['timePlayed']}`, true)
							.addBlankField(true)
							.addField('Squad', `Wins: ${stats['group']['squad']['wins']}\nWin Percentage: ${stats['group']['squad']['win%']}\nTop 3: ${stats['group']['squad']['top3']}\nTop 6: ${stats['group']['squad']['top6']}\nKills: ${stats['group']['squad']['kills']}\nK/D: ${stats['group']['squad']['k/d']}\nKills Per Minute: ${stats['group']['squad']['killsPerMin']}\nKills Per Match: ${stats['group']['squad']['killsPerMatch']}\nMatches: ${stats['group']['squad']['matches']}\nPlaytime: ${stats['group']['squad']['timePlayed']}`, true)
							.setFooter('@Kaz-Bot')
							.setTimestamp(new Date());
						return message.channel.send({ embed: fortStats });
					})
					.catch(err => {
						console.log(err);
						return message.channel.send('Cannot retrieve Player Stats!');
					});
			})
			.catch(err => {
				console.log(err);
				return message.channel.send('Unable to connect to Fortnite Servers!');
			});
	},
};