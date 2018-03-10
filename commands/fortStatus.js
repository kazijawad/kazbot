const fortnite = require('fortnite-api');

const fortniteAPIKey = [process.env.fortniteEmail, process.env.fortnitePass, process.env.fortniteLaunchToken, process.env.fortniteClientToken];
const fortniteAPI = new fortnite(fortniteAPIKey);

module.exports = {
	name: 'fortstatus',
	aliases: ['fortniteStatus', 'ftstatus'],
	description: 'Shows the status of Fortnite Servers',
	cooldown: 10,
	execute(message) {
		fortniteAPI.login().then(() => {
			fortniteAPI.checkFortniteStatus()
				.then((status) => {
					if (status === true) {
						message.channel.send('Fortnite is Online!');
					}
					else if (status === false) {
						message.channel.send('Fortnite is Down!' + '\n' + 'Check: https://twitter.com/FortniteGame');
					}
				})
				.catch((err) => {
					console.log(err);
					message.channel.send('Failed to check Fortnite Server Status!');
				});
		});
	},
};