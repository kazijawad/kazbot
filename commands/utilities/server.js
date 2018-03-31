const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server',
			aliases: ['guild'],
			group: 'utilities',
			memberName: 'server',
			description: 'Retrieves Server Information.',
			examples: ['server'],
			guildOnly: true,
		});
	}

	async run(message) {
		const guildEmbed = new RichEmbed()
			.setColor('DARK_GOLD')
			.setTitle(message.member.guild.name)
			.setThumbnail(message.member.guild.iconURL)
			.addField('Server Owner', message.guild.owner.displayName, true)
			.addField('Total Members', message.guild.memberCount, true)
			.addField('Server Region', message.guild.region, true)
			.addField('AFK Channel', message.guild.afkChannel.name, true)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());

		message.embed(guildEmbed);
	}
};