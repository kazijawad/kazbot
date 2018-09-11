# KazBot

[![Discord Bots](https://discordbots.org/api/widget/status/419724462716354560.svg)](https://discordbots.org/bot/419724462716354560)
[![Discord Bots](https://discordbots.org/api/widget/servers/419724462716354560.svg)](https://discordbots.org/bot/419724462716354560)
[![Discord Bots](https://discordbots.org/api/widget/upvotes/419724462716354560.svg)](https://discordbots.org/bot/419724462716354560)
[![Discord Bots](https://discordbots.org/api/widget/lib/419724462716354560.svg)](https://discordbots.org/bot/419724462716354560)
[![Discord Bots](https://discordbots.org/api/widget/owner/419724462716354560.svg)](https://discordbots.org/bot/419724462716354560)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)

A multipurpose bot that focuses on retrieving data from various video games.

## Getting Started
[Server Invitation](https://discordapp.com/api/oauth2/authorize?client_id=419724462716354560&permissions=8&scope=bot)

Prefix: k!

## Features
A list of all the available commands!

For certain video game commands, PC is the default platform and does not need to be entered.

### Server Management Commands

| Command                  | Description                                  | Example                | Aliases     |
| ------------------------ | -------------------------------------------- | ---------------------- | ----------- |
| k!ping                   | Pings KazBot.                                | k!ping                 |             |
| k!help                   | Lists all the available commands for KazBot. | k!help                 |             |
| k!prune [number]         | Prunes a certain number of messages.         | k!prune 50             | purge, cut  |
| k!kick [@Discord Member] | Kicks the specified member.                  | k!kick @YellowJay#5984 |             |
| k!ban [@Discord Member]  | Bans the specified member.                   | k!ban @YellowJay#5984  |             |

### Information Commands

| Command                    | Description                                  | Example                  | Aliases     |
| ------------------------   | -------------------------------------------- | ------------------------ | ----------- |
| k!server                   | Retrieves information on the server.         | k!server                 | guild       |
| k!user                     | Retrieves information on the user.           | k!user                   | member, me  |
| k!avatar [@Discord Member] | Retrives the specified user's avatar.        | k!avatar @YellowJay#5984 | icon        |
| k!role [@Discord Member]   | Retrives the specified user's role(s).       | k!role @YellowJay#5984   | roles       |
| k!credit                   | Displays the credit for KazBot.              | k!credit                 |             |

### Music Commands - Supports Youtube Playlists

| Command                    | Description                                  | Example                  | Aliases     |
| -------------------------- | -------------------------------------------- | ------------------------ | ----------- |
| k!play [name/url]          | Adds the specified song to the queue.        | k!play The Campfire Song |             |
| k!queue                    | Retrieves the queue of songs.                | k!queue                  |             |
| k!song                     | Displays the song currently playing.         | k!song                   |             |
| k!volume [value]           | Changes the volume of KazBot.                | k!volume 5               | vol         |
| k!resume                   | Resumes the current song.                    | k!resume                 |             |
| k!pause                    | Pauses the current song.                     | k!pause                  |             |
| k!skip                     | Skips the current song.                      | k!skip                   |             |
| k!stop                     | Cancels the queue.                           | k!stop                   |             |

### Fun Commands

| Command                      | Description                                  | Example                  | Aliases     |
| ---------------------------- | -------------------------------------------- | ------------------------ | ----------- |
| k!8ball [question]           | Asks the magic 8ball a question.             | k!8ball Am I smart?      |             |
| k!coin                       | Tosses a coin.                               | k!coin                   | toss        |
| k!rps [rock/paper/scissors]  | Plays rock, paper & scissors against KazBot. | k!rps rock               |             |
| k!reverse [phrase]           | Reverses any phrase passed through.          | k!reverse kazbot         |             |
| k!urban [term]               | Searches any term on urban dictionary.       | k!urban discord          |             |

### Crypto Commands

| Command                               | Description                                  | Example                  | Aliases     |
| ------------------------------------- | -------------------------------------------- | ------------------------ | ----------- |
| k!crypto [coin]                       | Retrieves data on the specified crypto.      | k!crypto BTC             |             |
| k!crypto global [conversion currency] | Retrieves data on the global market.         | k!crypto global          |             |

### Fortnite Commands - PC set to default platform

| Command                      | Description                                  | Example                  | Aliases     |
| ---------------------------- | -------------------------------------------- | ------------------------ | ----------- |
| k!ft [pc/xb1/ps4] [username] | Retrives specified player's Fortnite stats.  | k!ft YellowJay64         |             |
| k!ft status                  | Displays the status of Fortnite.             | k!ft status              |             |
| k!ft news                    | Retrives Fortnite news.                      | k!ft news                |             |

### Warframe Commands - PC set to default platform

| Command                         | Description                                  | Example                  | Aliases     |
| ------------------------------- | -------------------------------------------- | ------------------------ | ----------- |
| k!wf news [pc/xb1/ps4]          | Shows news on Warframe.                      | k!wf news                |             |
| k!wf baro [pc/xb1/ps4]          | Shows information on the Void Trader.        | k!wf baro                |             |
| k!wf sortie [pc/xb1/ps4]        | Shows information on the current sortie.     | k!wf sortie              |             |
| k!wf daily [pc/xb1/ps4]         | Shows information on the daily deal.         | k!wf daily               |             |
| k!wf simaris [pc/xb1/ps4]       | Shows information on Simaris' target.        | k!wf simaris             |             |
| k!wf earth [pc/xb1/ps4]         | Shows information on the Earth cycle.        | k!wf earth               |             |
| k!wf cetus [pc/xb1/ps4]         | Shows information on the Cetus cycle.        | k!wf cetus               |             |
| k!wf construction [pc/xb1/ps4]  | Shows information on construction progress.  | k!wf construction        |             |

### Misc. Game Commands

**NOT CURRENTLY WORKING**: Overwatch Command

| Command                      | Description                                    | Example                  | Aliases     |
| ---------------------------- | ---------------------------------------------- | ------------------------ | ----------- |
| k!csgo [username]            | Retrives specified player's CSGO stats.        | k!csgo YellowJay         | cs          |
| k!lol [summoner]             | Retrives specified player's LoL stats.         | k!lol MaximumTilt        |             |
| k!ow [username-tag]          | Retrives specified player's Overwatch stats.   | k!ow YellowJay-1902      |             |
| k!br [username]              | Retrives specified player's Battlerite stats.  | k!br TimmehHD            |             |

## Built With
- [Discord API](https://discordapp.com/developers/docs/intro)
- [Discord.js](https://discord.js.org/#/)

## Author
Kazi Jawad

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/kazijawad/KazBot/blob/master/LICENSE.md) file for details

## Acknowledgments
- [Fornite API Wrapper](https://github.com/qlaffont/fortnite-api)
- [Overwatch API Wrapper](https://github.com/gclem/overwatch-js)
- [CoinMarketCap API](https://pro.coinmarketcap.com)
- [Youtube Download Module](https://www.npmjs.com/package/ytdl-core)