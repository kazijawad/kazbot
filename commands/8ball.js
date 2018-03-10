module.exports = {
	name: '8ball',
	description: 'Ask the magical 8ball questions!',
	args: true,
	usage: '[QUESTION]',
	cooldown: 5,
	execute(message) {
		const response = [
			'It is certain',
			'It is decidedly so',
			'Without a doubt',
			'Yes definitely',
			'You may rely on it',
			'As I see it, yes',
			'Most likely',
			'Outlook good',
			'Yep',
			'Signs point to yes',
			'Reply hazy try again',
			'Ask again later',
			'Better not tell you now',
			'Cannot predict now',
			'Concentrate and ask again',
			'Don\'t count on it',
			'My reply is no',
			'My sources say no',
			'Outlook not so good',
			'Very doubtful',
		];
		const answer = response[Math.floor(Math.random() * response.length)];
		message.reply(answer);
	},
};