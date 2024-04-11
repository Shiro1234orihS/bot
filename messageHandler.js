const { EmbedBuilder } = require('discord.js');

function handleRegularMessages(message) {
    
    const responses = {
        '!Slaapy': 'DIEU des Femmes',
        '!Theoxeu': 'Homme aux testicules élastiques',
        '!Adelaide': 'Une artiste aux incroyable talents',
        '!Sabodia' : 'Juste dieu',
        '!Cupi' : 'Le plus gros fans VITALITY du monde',
        'Zowkii':  'liste : Pigeon, go muscu, valo addicte, GO PRISON!!!!!!',
        'Zowkii2':  'liste : Pigeon , go muscu , BDG , accro à valo ,violeur et PEDO , GO PRISON!!!!!!',
        'Sekai':  'Le noir',
        'Lilou':  'La graphiste du serveur et toujours pas diamant',
        'Marashel':  'Bonne question',
        'Eli':  'Croix moi, tu veux pas la connaitre'

        // Ajoute ici d'autres commandes et réponses
    };
    if (message.content.startsWith('!test') && message.mentions.users.size > 0) {
        let mentionedUser = message.mentions.users.first();  // Récupère le premier utilisateur mentionné
        message.channel.send(`Tu as mentionné l'utilisateur ${mentionedUser.username}!`);
    }
    
    if (responses[message.content]) {
        message.channel.send(responses[message.content]);
    }
};

async function  disconnect(message){
    // Pour éviter de répondre aux messages d'autres bots ou de lui-même
    if (message.author.bot) return;
    
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
        console.log(member.voice.channel)
        // Informer si l'utilisateur n'est pas dans un canal vocal
        message.channel.send("Tu n'es pas dans un canal vocal!");
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
};

function handleHelpCommand(message) {

    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Messade d\'aide')
    .setURL('http://ricardonunesemilio.fr/')
    .setAuthor({ name: 'Bot de ricardo', iconURL: 'https://discord.bots.gg/img/logo_transparent.png', url: 'http://ricardonunesemilio.fr/' })
    .setDescription('Voici tout les commande pour m\'utiliser')
    .setThumbnail('https://discord.bots.gg/img/logo_transparent.png')
    .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://discord.bots.gg/img/logo_transparent.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://discord.bots.gg/img/logo_transparent.png' });
    
    message.channel.send({ embeds: [exampleEmbed] });
};







// Exporte une fonction qui sera appelée à chaque fois qu'un message est créé
module.exports = message => {
    if (message.author.bot) return;

    // Gestion des commandes spécifiques
    switch (message.content) {
        case '!help':
            handleHelpCommand(message);
            break;
        case '!disconect' : 
            disconnect(message);
            break;
        default:
            handleRegularMessages(message);
            break;
    }
};
