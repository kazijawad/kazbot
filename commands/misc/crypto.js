const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const axios = require('axios');

const instance = axios.create({
	baseURL: 'https://pro-api.coinmarketcap.com',
	headers: { 'X-CMC_PRO_API_KEY': process.env.COIN_API },
});

class CryptoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'crypto',
			group: 'misc',
			memberName: 'crypto',
			description: 'Retrieves CryptoCurrency information from CoinMarketCap',
			examples: ['crypto BTC', 'crypto global'],
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 10,
			},
			args: [
				{
					key: 'coin',
					prompt: 'Which crypto would you like to lookup?',
					type: 'string',
				},
				{
					key: 'market',
					prompt: 'What currency would you like market quotes in?',
					type: 'string',
					default: 'USD',
				},
			],
		});
	}

	async run(message, { coin, market }) {
		if (coin === 'global') {
			instance.get('/v1/global-metrics/quotes/latest', { params: { convert: market } })
				.then(response => {
					const global = response['data']['data'];
					const cryptoGlobal = new RichEmbed()
						.setColor('GREEN')
						.setTitle('Global Crypto Info')
						.addField('Bitcoin Dominance', global['btc_dominance'], true)
						.addField('Ethereum Dominance', global['eth_dominance'], true)
						.addField('Active Cryptocurrencies', global['active_cryptocurrencies'], true)
						.addField('Active Market Pairs', global['active_market_pairs'], true)
						.addField('Active Exchanges', global['active_exchanges'], true)
						.addField('Total Market Cap', global['quote'][market]['total_market_cap'], true)
						.addField('Total 24hr Volume', global['quote'][market]['total_volume_24h'], true)
						.setFooter('@Kaz-Bot')
						.setTimestamp(new Date());
					message.embed(cryptoGlobal);
				})
				.catch(error => {
					console.warn(`COIN API: ${error}`);
					message.say('Failed to locate cryptocurrency in CoinMarketCap!');
				});
		} else {
			instance.get('/v1/cryptocurrency/quotes/latest', { params: { symbol: coin, convert: market } })
				.then(response => {
					const crypto = response['data']['data'][coin];
					console.log(crypto);
					const cryptoInfo = new RichEmbed()
						.setColor('GREEN')
						.setTitle(crypto['name'])
						.addField('Symbol', crypto['symbol'], true)
						.addField('Rank', crypto['cmc_rank'], true)
						.addField('Price', crypto['quote'][market]['price'], true)
						.addField('Market Cap', crypto['quote'][market]['market_cap'], true)
						.addField('Circulating Supply', crypto['circulating_supply'], true)
						.addField('Total Supply', crypto['total_supply'], true)
						.addField('Max Supply', crypto['max_supply'], true)
						.setFooter('@Kaz-Bot')
						.setTimestamp(new Date());
					message.embed(cryptoInfo);
				})
				.catch(error => {
					console.warn(`COIN API: ${error}`);
					message.say('Failed to retrieve global information from CoinMarketCap!');
				});
		}
	}
}

module.exports = CryptoCommand;
