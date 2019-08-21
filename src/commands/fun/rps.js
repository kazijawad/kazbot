const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

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
		const botWon = `KazBot won by choosing ${botChoice}!`;
		const playerWon = `${message.member.displayName} won because KazBot chose ${botChoice}!`;
		const draw = `Draw, you both chose ${botChoice}!`;

		const embed = new RichEmbed({
			color: 0x3498db,
			footer: {
				text: '@KazBot',
				icon_url: process.env.AVATAR_URL,
			},
			timestamp: new Date(),
			title: 'Rock, Paper, Scissors',
		});

		switch (playerChoice) {
			case 'rock':
				switch (botChoice) {
					case 'rock':
						embed.setDescription(draw);
						break;
					case 'paper':
						embed.setDescription(botWon);
						break;
					case 'scissors':
						embed.setDescription(playerWon);
						break;
					default:
						break;
				}
				break;
			case 'paper':
				switch (botChoice) {
					case 'rock':
						embed.setDescription(playerWon);
						break;
					case 'paper':
						embed.setDescription(draw);
						break;
					case 'scissors':
						embed.setDescription(botWon);
						break;
					default:
						break;
				}
				break;
			case 'scissors':
				switch (botChoice) {
					case 'rock':
						embed.setDescription(botWon);
						break;
					case 'paper':
						embed.setDescription(playerWon);
						break;
					case 'scissors':
						embed.setDescription(draw);
						break;
					default:
						break;
				}
				break;
			default:
				embed.setDescription('Please pass in an argument with rock/paper/scissors!');
		}

		message.embed(embed);
	}
}

module.exports = RPSCommand;
