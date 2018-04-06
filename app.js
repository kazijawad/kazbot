process.on('unhandledRejection', error => console.log(`Uncaught Rejection: ${error}`));
require('dotenv').config();

const path = require('path');
const sqlite = require('sqlite');
const Commando = require('discord.js-commando');
const DBL = require('dblapi.js');

const token = process.env.TOKEN;
const dbl = new DBL(process.env.DBL_API);

const client = new Commando.Client({
	owner: '221449635254894594',
	commandPrefix: 'k!',
	disableEveryone: true,
});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerDefaults()
	.registerGroups([
		['moderation', 'Moderation Commands'],
		['utilities', 'Utility Commands'],
		['games', 'Game Information Commands'],
		['music', 'Music Commands'],
		['fun', 'Fun Commands'],
		['misc', 'Misc Commands'],
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

client
	.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);
		client.user.setPresence({ game: { name: 'k!help' } });
		setInterval(() => {
			dbl.postStats(client.guilds.size);
		}, 1800000);
	});

client.login(token);