const dotenv = require('dotenv');
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

process.on('unhandledRejection', (reason, promise) => {
    console.warn('[Unhandled Rejection]', promise, 'reason:', reason);
});

dotenv.config();

const client = new CommandoClient({
    owner: '221449635254894594',
    commandPrefix: 'k!',
    disableEveryone: true,
    unknownCommandResponse: false,
});

client.registry
    .registerDefaults()
    .registerGroups([
        ['fun', 'Fun'],
        ['moderation', 'Moderation'],
        ['music', 'Music'],
        ['utilities', 'Utility'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.info(`[ONLINE] ${client.user.tag}!`);
    if (process.env.NODE_ENV === 'production') {
        console.info(`[SERVER COUNT] ${client.guilds.size}`);
        setInterval(() => {
            console.info(`[SERVER COUNT] ${client.guilds.size}`);
        }, 1000 * 60 * 60);
    }
    client.user.setPresence({ game: { name: 'k!help' } });
});

client.login(process.env.TOKEN);
