const { Command } = require('discord.js-commando');
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
					const cryptoGlobal = {
						color: 0x008000,
						title: 'Global Crypto Info',
						author: {
							name: 'KazBot',
							icon_url: process.env.AVATAR_URL,
							url: 'https://kazijawad.github.io/',
						},
						fields: [
							{
								name: 'Bitcoin Dominance',
								value: global['btc_dominance'].toString(),
								inline: true,
							},
							{
								name: 'Ethereum Dominance',
								value: global['eth_dominance'].toString(),
								inline: true,
							},
							{
								name: 'Active Cryptocurrencies',
								value: global['active_cryptocurrencies'],
								inline: true,
							},
							{
								name: 'Active Market Pairs',
								value: global['active_market_pairs'],
								inline: true,
							},
							{
								name: 'Active Exchanges',
								value: global['active_exchanges'],
								inline: true,
							},
							{
								name: 'Total Market Cap',
								value: global['quote'][market]['total_market_cap'].toString(),
								inline: true,
							},
							{
								name: 'Total 24hr Volume',
								value: global['quote'][market]['total_volume_24h'].toString(),
								inline: true,
							},
						],
						timestamp: new Date(),
						footer: {
							text: '@KazBot',
							icon_url: message.client.user.avatarURL,
						},
					};

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
					const cryptoInfo = {
						color: 0x008000,
						title: crypto['name'],
						author: {
							name: 'KazBot',
							icon_url: process.env.AVATAR_URL,
							url: 'https://kazijawad.github.io/',
						},
						fields: [
							{
								name: 'Symbol',
								value: crypto['symbol'],
								inline: true,
							},
							{
								name: 'Rank',
								value: crypto['cmc_rank'],
								inline: true,
							},
							{
								name: 'Price',
								value: crypto['quote'][market]['price'].toString(),
								inline: true,
							},
							{
								name: 'Market Cap',
								value: crypto['quote'][market]['market_cap'].toString(),
								inline: true,
							},
							{
								name: 'Circulating Supply',
								value: crypto['circulating_supply'],
								inline: true,
							},
							{
								name: 'Total Supply',
								value: crypto['total_supply'],
								inline: true,
							},
							{
								name: 'Max Supply',
								value: crypto['max_supply'],
								inline: true,
							},
						],
						timestamp: new Date(),
						footer: {
							text: '@KazBot',
							icon_url: message.client.user.avatarURL,
						},
					};

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
