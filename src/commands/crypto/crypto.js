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
			group: 'crypto',
			memberName: 'crypto',
			description: 'Retrieves CryptoCurrency information from CoinMarketCap',
			examples: ['crypto BTC', 'crypto global'],
			guildOnly: false,
			throttling: {
				usages: 30,
				duration: 60,
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
			try {
				const response = await instance.get('/v1/global-metrics/quotes/latest', { params: { convert: market } });
				const global = response['data']['data'];

				message.embed({
					color: 0x27ae60,
					fields: [
						{
							name: 'Bitcoin Dominance',
							value: `${Math.round(global['btc_dominance'])}%`,
							inline: true,
						},
						{
							name: 'Ethereum Dominance',
							value: `${Math.round(global['eth_dominance'])}%`,
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
					],
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: 'Global Cryptocurrency Information',
				});
			} catch (error) {
				console.warn(`[COIN API] ${error.message}`);
				message.embed({
					color: 0x27ae60,
					description:'Failed to retrieve global information from CoinMarketCap.',
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: 'Global Cryptocurrency Information',
				});
			}
		} else {
			try {
				const response = await instance.get('/v1/cryptocurrency/quotes/latest', { params: { symbol: coin.toUpperCase(), convert: market } });
				const crypto = response['data']['data'][coin.toUpperCase()];

				message.embed({
					color: 0x27ae60,
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
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: crypto['name'],
				});
			} catch (error) {
				console.warn(`[COIN API] ${error.message}`);
				message.embed({
					color: 0x27ae60,
					description: 'Failed to locate cryptocurrency in CoinMarketCap.',
					footer: {
						text: '@KazBot',
						icon_url: process.env.AVATAR_URL,
					},
					timestamp: new Date(),
					title: 'Cryptocurrency Information',
				});
			}
		}
	}
}

module.exports = CryptoCommand;
