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
const dblClient = new DBL(process.env.DBL_TOKEN, client);

client.registry
	.registerDefaults()
	.registerGroups([
		['fun', 'Fun'],
		['moderation', 'Moderation'],
		['music', 'Music'],
		['utilities', 'Utility'],
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`);
	if (process.env.NODE_ENV === 'production') {
		dblClient.postStats(client.guilds.size);
		setInterval(() => {
			dblClient.postStats(client.guilds.size);
		}, 1000 * 60 * 60);
	}
	client.user.setPresence({ game: { name: 'k!help' } });
});

client.login(process.env.TOKEN);
