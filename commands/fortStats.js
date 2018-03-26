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
					.then(stats => {
						const fortStats = new discord.RichEmbed()
							.setColor('PURPLE')
							.setTitle(stats['info']['username'] + '\'s Fortnite Stats')
							.addField('Overall', `Wins: ${stats['lifetimeStats']['wins']} | Win %: ${stats['lifetimeStats']['win%']}\nKills: ${stats['lifetimeStats']['kills']} | K/D: ${stats['lifetimeStats']['k/d']}\nKills Per Minute: ${stats['lifetimeStats']['killsPerMin']}\nMatches: ${stats['lifetimeStats']['matches']}\nPlaytime: ${stats['lifetimeStats']['timePlayed']}`, true)
							.addField('Solo', `Wins: ${stats['group']['solo']['wins']} | Win %: ${stats['group']['solo']['win%']}\nTop 10: ${stats['group']['solo']['top10']} | Top 25: ${stats['group']['solo']['top25']}\nKills: ${stats['group']['solo']['kills']} | K/D: ${stats['group']['solo']['k/d']}\nKills Per Match: ${stats['group']['solo']['killsPerMatch']}\nMatches: ${stats['group']['solo']['matches']} | Playtime: ${stats['group']['solo']['timePlayed']}`, true)
							.addBlankField()
							.addField('Duo', `Wins: ${stats['group']['duo']['wins']} | Win%: ${stats['group']['duo']['win%']}\nTop 5: ${stats['group']['duo']['top5']} | Top 12: ${stats['group']['duo']['top12']}\nKills: ${stats['group']['duo']['kills']} | K/D: ${stats['group']['duo']['k/d']}\nKills Per Match: ${stats['group']['duo']['killsPerMatch']}\nMatches: ${stats['group']['duo']['matches']} | Playtime: ${stats['group']['duo']['timePlayed']}`, true)
							.addField('Squad', `Wins: ${stats['group']['squad']['wins']} | Win %: ${stats['group']['squad']['win%']}\nTop 3: ${stats['group']['squad']['top3']} | Top 6: ${stats['group']['squad']['top6']}\nKills: ${stats['group']['squad']['kills']} | K/D: ${stats['group']['squad']['k/d']}\nKills Per Match: ${stats['group']['squad']['killsPerMatch']}\nMatches: ${stats['group']['squad']['matches']} | Playtime: ${stats['group']['squad']['timePlayed']}`, true)
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