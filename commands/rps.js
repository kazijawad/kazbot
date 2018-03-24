const choices = ['rock', 'paper', 'scissors'];

module.exports = {
	name: 'rps',
	description: 'Play rock, paper & scissors with Kaz Bot!',
	args: true,
	usage: '[ROCK/PAPER/SCISSORS]',
	cooldown: 3,
	guildOnly: false,
	execute(message, args) {
		const botChoice = choices[Math.floor(Math.random() * choices.length)];
		const botWon = `Kaz Bot won! He chose paper! ${botChoice}`;
		const playerWon = `${message.member.displayName} won! Kaz Bot chose ${botChoice}!`;
		const draw = `Draw! You both chose ${botChoice}!`;

		switch (args[0]) {
		case 'rock':
			switch (botChoice) {
			case 'rock':
				message.channel.send(draw);
				break;
			case 'paper':
				message.channel.send(botWon);
				break;
			case 'scissors':
				message.channel.send(playerWon);
				break;
			}
			break;
		case 'paper':
			switch (botChoice) {
			case 'rock':
				message.channel.send(playerWon);
				break;
			case 'paper':
				message.channel.send(draw);
				break;
			case 'scissors':
				message.channel.send(botWon);
				break;
			}
			break;
		case 'scissors':
			switch (botChoice) {
			case 'rock':
				message.channel.send(botWon);
				break;
			case 'paper':
				message.channel.send(playerWon);
				break;
			case 'scissors':
				message.channel.send(draw);
				break;
			}
			break;
		default:
			message.reply('Please pass in an argument with rock/paper/scissors!');
		}
	},
};