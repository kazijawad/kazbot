module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		return message.channel.send('Pong!');
	},
};