process.on('unhandledRejection', error => console.warn(`[UNHANDLED REJECTION] ${error}`));
require('dotenv').config();

const path = require('path');
const { CommandoClient } = require('discord.js-commando');
const axios = require('axios');

const client = new CommandoClient({
	owner: '221449635254894594',
	commandPrefix: 'k!',
	disableEveryone: true,
	unknownCommandResponse: false,
});

const instance = axios.create({
	baseURL: 'https://discord.bots.gg/api/v1',
	headers: {
		'Authorization': process.env.DBL_API,
		'Content-Type': 'application/json',
	},
});

async function recordServerCount() {
	try {
		console.info(`[SERVER COUNT] ${client.guilds.size}`);
		await instance.post(`/bots/${process.env.CLIENT_ID}/stats`, {
			guildCount: client.guilds.size,
		});
	} catch (error) {
		console.error(`[DBL ERROR] ${error}`);
	}
}

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
	if (process.env.NODE_ENV === 'production') {
		recordServerCount();
		setInterval(() => {
			recordServerCount();
		}, 1000 * 60 * 60);
	}
	client.user.setPresence({ game: { name: 'k!help' } });
});

client.login(process.env.TOKEN);
