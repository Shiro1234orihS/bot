const { Client, GatewayIntentBits, EmbedBuilder  } = require('discord.js');

const {token} = require('./config');
const messageHandler = require('./messageHandler');



// Créer une nouvelle instance de client avec l'intent nécessaire
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Assure-toi que cet intent est activé sur le portail des développeurs
    ]
});

client.on('messageCreate', messageHandler);

// Événement lors de la connexion du bot
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
});
//Connexion au bot avec ton token
client.login(token);
