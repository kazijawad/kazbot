module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	execute(message) {
		return message.channel.send('Pong!');
	},
};