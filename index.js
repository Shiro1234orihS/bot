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

// Événement lors de la connexion du bot
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
});

client.on('messageCreate', messageHandler);



 // Événement lors de la réception d'un message
client.on('messageCreate', async message => {
    // Pour éviter de répondre aux messages d'autres bots ou de lui-même
    if (message.author.bot) return;
    // Commande '!disconnect'
    if (message.content.startsWith('!disconnect')) {
        // Obtenir l'utilisateur à déconnecter (le membre qui a envoyé la commande)
        let member = message.member;
        // Vérifier si l'utilisateur est dans un canal vocal
        if (member.voice.channel) {
            try {
                // Déconnecter l'utilisateur du canal vocal
                await member.voice.disconnect('Déconnexion demandée par la commande');
                message.channel.send(`${member.displayName} a été déconnecté du canal vocal.`);
            } catch (error) {
                // Gérer les erreurs, par exemple si le bot n'a pas la permission
                console.error(error);
                message.channel.send("Je n'ai pas la permission de faire cela!");
            }
        } else {
            // Informer si l'utilisateur n'est pas dans un canal vocal
            message.channel.send("Tu n'es pas dans un canal vocal!");
        }
    }
    if (message.content.startsWith('/createchannel')) {
        const channelName = message.content.split(' ').slice(1).join('-').replace(/^-+|-+$/g, '');
        if (!channelName) return message.reply("Tu dois spécifier un nom pour le salon texte!");
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.reply("Tu n'as pas la permission de créer des salons!");
        }
        console.log(`Création d'un salon avec le nom: ${channelName}`);
        try {
            // Assurez-vous d'attendre que la promesse soit résolue et de passer les options nécessaires pour la création du canal
            const newChannel = await message.guild.channels.create(channelName, {
                type: 'GUILD_TEXT', // Définit le type de canal comme un canal textuel
            });
            message.reply(`Salon créé: #${newChannel.name}`);
        } catch (error) {
            console.error(error);
            message.reply("Je ne peux pas créer ce salon, vérifie que le nom est valide et que j'ai les permissions nécessaires.");
        }
    }
});


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

//Connexion au bot avec ton token
client.login(token);
