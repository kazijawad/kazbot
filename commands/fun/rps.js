const { Command } = require('discord.js-commando');

const choices = ['rock', 'paper', 'scissors'];

class RPSCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rps',
			group: 'fun',
			memberName: 'rps',
			description: 'Plays Rock, Paper, Scissors with KazBot.',
			examples: ['rps rock', 'rps paper', 'rps scissors'],
			guildOnly: false,
			args: [
				{
					key: 'playerChoice',
					prompt: 'What would you like to play?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { playerChoice }) {
		const botChoice = choices[Math.floor(Math.random() * choices.length)];
		const botWon = `Kaz Bot won! He chose ${botChoice}!`;
		const playerWon = `${message.member.displayName} won! Kaz Bot chose ${botChoice}!`;
		const draw = `Draw! You both chose ${botChoice}!`;

		switch (playerChoice) {
			case 'rock':
				switch (botChoice) {
					case 'rock':
						message.say(draw);
						break;
					case 'paper':
						message.say(botWon);
						break;
					case 'scissors':
						message.say(playerWon);
						break;
				}
				break;
			case 'paper':
				switch (botChoice) {
					case 'rock':
						message.say(playerWon);
						break;
					case 'paper':
						message.say(draw);
						break;
					case 'scissors':
						message.say(botWon);
						break;
				}
				break;
			case 'scissors':
				switch (botChoice) {
					case 'rock':
						message.say(botWon);
						break;
					case 'paper':
						message.say(playerWon);
						break;
					case 'scissors':
						message.say(draw);
						break;
				}
				break;
			default:
				return message.reply('Please pass in an argument with rock/paper/scissors!');
		}
	}
}

module.exports = RPSCommand;
