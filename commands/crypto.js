const coinmarketcap = require('coinmarketcap-api');
const discord = require('discord.js');
const crypto = new coinmarketcap();

module.exports = {
	name: 'crypto',
	description: 'Search for information on cryptocurrencies!',
	args: true,
	usage: '[SPECIFIC COIN/GLOBAL]',
	cooldown: 5,
	guildOnly: false,
	execute(message, args) {
		if (args[0] === 'global') {
			crypto.getGlobal()
				.then(data => {
					const cryptoGlobal = new discord.RichEmbed()
						.setColor('GREEN')
						.setTitle('Global Crypto Info')
						.addField('Total USD Market Cap', data.total_market_cap_usd, true)
						.addField('Total 24HR USD Volume', data.total_24h_volume_usd, true)
						.addField('Bitcoin % of Market Cap', data.bitcoin_percentage_of_market_cap, true)
						.addField('Active Currencies', data.active_currencies, true)
						.addField('Active Assets', data.active_assets, true)
						.addField('Active Markets', data.active_markets, true)
						.setFooter('@Kaz-Bot')
						.setTimestamp(new Date());
					return message.channel.send({ embed: cryptoGlobal });
				})
				.catch(err => {
					console.log(err);
					return message.channel.send('Failed to connect to CoinMarketCap!');
				});
		}
		else {
			crypto.getTicker({ limit: 1, convert: 'USD', currency: args })
				.then(data => {
					const cryptoInfo = new discord.RichEmbed()
						.setColor('GREEN')
						.setTitle(data[0].name)
						.addField('Symbol', data[0].symbol, true)
						.addField('Rank', data[0].rank, true)
						.addField('USD Price', data[0].price_usd, true)
						.addField('BTC Price', data[0].price_btc, true)
						.addField('USD Market Cap', data[0].market_cap_usd, true)
						.addField('Available Supply', data[0].available_supply, true)
						.addField('Total Supply', data[0].total_supply, true)
						.addField('Max Supply', data[0].max_supply, true)
						.setFooter('@Kaz-Bot')
						.setTimestamp(new Date());
					return message.channel.send({ embed: cryptoInfo });
				})
				.catch(err => {
					console.log(err);
					return message.channel.send('Failed to connect to CoinMarketCap!');
				});
		}
	},
};