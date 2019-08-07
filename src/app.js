process.on('unhandledRejection', error => console.warn(`[UNCAUGHT REJECTION] ${error}`));
require('dotenv').config();

const path = require('path');
const { CommandoClient } = require('discord.js-commando');
const DBL = require('dblapi.js');

const client = new CommandoClient({
	owner: '221449635254894594',
	commandPrefix: 'k!',
	disableEveryone: true,
	unknownCommandResponse: false,
});

client.registry
	.registerDefaults()
	.registerGroups([
		['crypto', 'Crypto'],
		['fun', 'Fun'],
		['games', 'Game Stats'],
		['moderation', 'Moderation'],
		['music', 'Music'],
		['utilities', 'Utility'],
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`);
	if (process.env.NODE_ENV === 'production') {
		setInterval(() => {
			const dblClient = new DBL(process.env.DBL_TOKEN, client);

			dblClient.on('posted', () => {
				console.info(`Server Count: ${client.guilds.size}`);
			});
		}, 1800000);
	}
	client.user.setPresence({ game: { name: 'k!help' } });
});

client.login(process.env.TOKEN);
