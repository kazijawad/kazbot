# KazBot

KazBot is a multipurpose chatbot that provides server management and utility commands. It has a suite of music commands capable of handling volume, queues, song selection, and custom playlists.

## Getting Started

[Invite Link](https://discord.com/oauth2/authorize?client_id=419724462716354560&scope=bot&permissions=8)

```
Prefix: k!
```

## Server Management Commands

| Command                  | Description                                  | Example                | Aliases     |
| ------------------------ | -------------------------------------------- | ---------------------- | ----------- |
| k!ping                   | Pings KazBot.                                | k!ping                 |             |
| k!help                   | Lists all the available commands for KazBot. | k!help                 |             |
| k!prune [number]         | Prunes a certain number of messages.         | k!prune 50             | purge, cut  |
| k!kick [@Discord Member] | Kicks the specified member.                  | k!kick @YellowJay#5984 |             |
| k!ban [@Discord Member]  | Bans the specified member.                   | k!ban @YellowJay#5984  |             |

## Information Commands

| Command                    | Description                                  | Example                  | Aliases     |
| ------------------------   | -------------------------------------------- | ------------------------ | ----------- |
| k!server                   | Retrieves information on the server.         | k!server                 | guild       |
| k!user                     | Retrieves information on the user.           | k!user                   | member, me  |
| k!avatar [@Discord Member] | Retrives the specified user's avatar.        | k!avatar @YellowJay#5984 | icon        |
| k!role [@Discord Member]   | Retrives the specified user's role(s).       | k!role @YellowJay#5984   | roles       |
| k!credit                   | Displays the credit for KazBot.              | k!credit                 |             |

## Music Commands

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

## Fun Commands

| Command                      | Description                                  | Example                  | Aliases     |
| ---------------------------- | -------------------------------------------- | ------------------------ | ----------- |
| k!8ball [question]           | Asks the magic 8ball a question.             | k!8ball Am I smart?      |             |
| k!coin                       | Tosses a coin.                               | k!coin                   | toss        |
| k!rps [rock/paper/scissors]  | Plays rock, paper & scissors against KazBot. | k!rps rock               |             |
| k!reverse [phrase]           | Reverses any phrase passed through.          | k!reverse kazbot         |             |
| k!urban [term]               | Searches any term on urban dictionary.       | k!urban discord          |             |

## Built With

- [Discord API](https://discordapp.com/developers/docs/intro)
- [Discord.js](https://discord.js.org/#/)

## Author

Kazi Jawad

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
