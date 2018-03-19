process.on('unhandledRejection', error => console.log(`Uncaught Rejection: ${error}`));
require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const DBL = require('dblapi.js');
const { prefix } = require('./config.json');

const token = process.env.token;
const client = new Discord.Client();
const dbl = new DBL(process.env.botAPIKey);

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag + '!');
	setInterval(() => {
		dbl.postStats(client.guilds.size);
	}, 1800000);
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'general');

	if (!channel) return;
	channel.send(`Welcome to the server, ${member}!`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('This command can only be executed in a Guild!');
	}

	if (!command.args && !command.usage && args.length) {
		const reply = `This command requires no arguments, ${message.author}`;
		return message.channel.send(reply);
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command!`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		return message.reply('There was an error trying to execute that command!');
	}
});

client.login(token);