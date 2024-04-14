const { EmbedBuilder } = require('discord.js');
const functionSurUtilisateur = require('./fonctionMechante/functionSurUtilisateur');
const fonctionUtile = require('./fonctionUtile/fonctionUtile');
const cooldowns = new Map();



function handleRegularMessages(message) {
    
    if(message.mentions.users.size > 0){

        if (message.content.startsWith('!test') ) {
            let mentionedUser = message.mentions.users.first(); // Récupère le premier utilisateur mentionné
            message.channel.send(`Tu as mentionné l'utilisateur ${mentionedUser.username}!`);
            console.log(message.mentions.users.first());
            return; // Important pour ne pas continuer après avoir traité cette commande
        }
    
        if(message.content.startsWith('!ban') &&   message.author.id == 683259683384983562   ){
    
            if(message.mentions.users.first().id != 566263050412228619)
                functionSurUtilisateur.ban(message); // Appel correct de disconnect
            else
                message.channel.send("Tu m'as pris pour un con")
            return;
        }else if(message.content.startsWith('!ban'))
            message.channel.send("Tu as pas les droits pour ban des gens")
    
        if(message.content.startsWith('!disconect') && message.mentions.users.size > 0) {
            functionSurUtilisateur.disconnect(message); // Appel correct de disconnect
            return;
        }
    }
    
    if(message.content.startsWith('!createvoicechannel')) {
        fonctionUtile.createvoicechannel(message)
        return
    }
    if(message.content.startsWith('!createtchatchannel')) {
        fonctionUtile.createtchatchannel(message)
        return
    }


    const responses = {
        '!Slaapy': 'DIEU des Femmes',
        '!Theoxeu': 'Homme aux testicules élastiques',
        '!Adelaide': 'Une artiste aux incroyable talents',
        '!Sabodia' : 'Juste dieu',
        '!Cupi' : 'Le plus gros fans VITALITY du monde',
        '!Zowkii':  'liste : Pigeon, go muscu, valo addicte, GO PRISON!!!!!!',
        '!Zowkii2':  'liste : Pigeon , go muscu , BDG , accro à valo ,violeur et PEDO , GO PRISON!!!!!!',
        '!Sekai':  'Le noir',
        '!Lilou':  'La graphiste du serveur et toujours pas diamant',
        '!Marashel':  'Bonne question',
        '!Eli':  'Croix moi, tu veux pas la connaitre',
    };
    
    
    if (responses[message.content]) {
        message.channel.send(responses[message.content]);
    }
};



function handleHelpCommand(message) {
    user = message.author;

    user.send({
        content: 'Voici votre aide personnalisée :', // Vous pouvez ajouter un message texte accompagnant l'embed
        embeds: [new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Message d\'aide')
            .setURL('http://ricardonunesemilio.fr/')
            .setAuthor({ name: 'Bot de Ricardo', iconURL: 'https://discord.bots.gg/img/logo_transparent.png', url: 'http://ricardonunesemilio.fr/' })
            .setDescription('Voici toutes les commandes pour m\'utiliser')
            .setThumbnail('https://discord.bots.gg/img/logo_transparent.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .setImage('https://discord.bots.gg/img/logo_transparent.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://discord.bots.gg/img/logo_transparent.png' })
        ]
    });
    
    message.channel.send("je t'ai envoie de l'aide");
};







// Exporte une fonction qui sera appelée à chaque fois qu'un message est créé
module.exports = message => {
    if (message.author.bot || !message.content.startsWith('!') ) return;

    // Durée du cooldown en millisecondes 
    const cooldownAmount = 60000;

    // Gestion des commandes spécifiques
    if (checkCooldown(message.author.id, cooldownAmount, message)) {
        switch (message.content) {
            case '!help':
                handleHelpCommand(message);
                break;
            default:
                handleRegularMessages(message);
                break;
        }
    }
};


// Fonction pour vérifier et gérer les cooldowns
function checkCooldown(userId, cooldownAmount, message) {
    const now = Date.now();
    if (!cooldowns.has(userId)) {
        // Si l'utilisateur n'est pas encore en cooldown, l'ajouter
        cooldowns.set(userId, now);
        return true;
    } else {
        const expirationTime = cooldowns.get(userId) + cooldownAmount;
        if (now < expirationTime) {
            // Si l'utilisateur est toujours en cooldown, envoyer un message et ne pas exécuter la commande
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`merci d'attendre ${timeLeft.toFixed(1)} seconde(s) .`);
            return false;
        } else {
            // Réinitialiser le cooldown si le temps est écoulé
            cooldowns.set(userId, now);
            return true;
        }
    }
}