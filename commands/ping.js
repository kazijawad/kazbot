module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	cooldown: 1,
	guildOnly: false,
	execute(message) {
		return message.channel.send('Pong!');
	},
};