module.exports = {
	name: 'reverse',
	description: 'Reverse any string passed through!',
	args: true,
	usage: '[PHRASE]',
	cooldown: 3,
	guildOnly: false,
	execute(message, args) {
		const arg = args.join(' ');
		const reverse = arg.split('').reverse().join('');
		message.channel.send(`${arg} ---> ${reverse}`);
	},
};