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




client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.content.startsWith('/createvoicechannel')) {
        // Récupère le nom du salon après la commande, en supposant que le nom peut avoir des espaces
        const channelName = message.content.split(' ').slice(1).join(' ').replace(/^-+|-+$/g, '');
        if (!channelName) return message.reply("Tu dois spécifier un nom pour le salon vocal!");
        // Vérifie si l'utilisateur a la permission de gérer les salons
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.reply("Tu n'as pas la permission de créer des salons!");
        }
        console.log(`Création d'un salon vocal avec le nom: ${channelName}`); // Log pour le debug
        // Tente de créer le salon vocal
        try {
            // Crée le salon vocal
            const newChannel = await message.guild.channels.create(channelName, { type: 'GUILD_VOICE' });
            // Informe l'utilisateur de la création
            message.reply(`Salon vocal créé: ${newChannel.name}`);
        } catch (error) {
            console.error(error);
            message.reply("Je ne peux pas créer ce salon vocal, vérifie que le nom est valide et que j'ai les permissions nécessaires.");
        }
    }
});

// Événement lors de la connexion du bot
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
});
//Connexion au bot avec ton token
client.login(token);
