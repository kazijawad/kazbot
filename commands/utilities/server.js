const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ServerCommand extends Command {
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
			.setTitle(message.guild.name)
			.setThumbnail(message.guild.iconURL)
			.addField('Guild ID', message.guild.id, true)
			.addField('Server Owner', message.guild.owner.displayName, true)
			.addField('Total Members', message.guild.memberCount, true)
			.addField('Server Region', message.guild.region, true)
			.setFooter('@Kaz-Bot')
			.setTimestamp(new Date());
		if (message.guild.afkChannel) { guildEmbed.addField('AFK Channel', message.guild.afkChannel.name, true); }
		message.embed(guildEmbed);
	}
};
