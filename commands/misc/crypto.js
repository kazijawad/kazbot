const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('request');

module.exports = class CryptoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'crypto',
			group: 'misc',
			memberName: 'crypto',
			description: 'Retrieves CryptoCurrency information from CoinMarketCap',
			examples: ['crypto bitcoin', 'crypto global'],
			throttling: {
				usages: 2,
				duration: 10,
			},
			guildOnly: false,
			args: [
				{
					key: 'coin',
					prompt: 'Which crypto would you like to lookup?',
					type: 'string',
				},
			],
		});
	}

	async run(message, { coin }) {
		const ticker = {
			'url': `https://api.coinmarketcap.com/v1/ticker/${coin}/`,
		};
		const global = {
			'url': `https://api.coinmarketcap.com/v1/${coin}/`,
		};

		if (coin === 'global') {
			request(global, (err, res, body) => {
				if (err) {
					console.error(err);
					return message.say('Failed to retrieve global information from CoinMarketCap!');
				}
				const info = JSON.parse(body);
				const cryptoGlobal = new RichEmbed()
					.setColor('GREEN')
					.setTitle('Global Crypto Info')
					.addField('Total USD Market Cap', info.total_market_cap_usd, true)
					.addField('Total 24HR USD Volume', info.total_24h_volume_usd, true)
					.addField('Bitcoin % of Market Cap', info.bitcoin_percentage_of_market_cap, true)
					.addField('Active Currencies', info.active_currencies, true)
					.addField('Active Assets', info.active_assets, true)
					.addField('Active Markets', info.active_markets, true)
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());
				message.embed(cryptoGlobal);
			});
		} else {
			request(ticker, (err, res, body) => {
				if (err) {
					console.error(err);
					return message.say('Failed to locate cryptocurrency in CoinMarketCap!');
				}
				const info = JSON.parse(body);
				const crypto = info[0];
				if (!crypto) return message.say('Failed to locate cryptocurrency in CoinMarketCap!');

				const cryptoInfo = new RichEmbed()
					.setColor('GREEN')
					.setTitle(crypto.name)
					.addField('Symbol', crypto.symbol, true)
					.addField('Rank', crypto.rank, true)
					.addField('USD Price', crypto.price_usd, true)
					.addField('BTC Price', crypto.price_btc, true)
					.addField('USD Market Cap', crypto.market_cap_usd, true)
					.addField('Available Supply', crypto.available_supply, true)
					.addField('Total Supply', crypto.total_supply, true)
					.addField('Max Supply', crypto.max_supply, true)
					.setFooter('@Kaz-Bot')
					.setTimestamp(new Date());
				message.embed(cryptoInfo);
			});
		}
	}
};
