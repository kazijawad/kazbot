process.on('unhandledRejection', error => console.warn(`[UNHANDLED REJECTION] ${error}`));
require('dotenv').config();

const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const client = new CommandoClient({
	owner: '221449635254894594',
	commandPrefix: 'k!',
	disableEveryone: true,
	unknownCommandResponse: false,
});

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
	console.info(`[ONLINE] ${client.user.tag}!`);
	client.user.setPresence({ game: { name: 'k!help' } });
});

client.login(process.env.TOKEN);
