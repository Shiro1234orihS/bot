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

    if (responses[message.content]) {
        message.channel.send(responses[message.content]);
    }
}

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
        default:
            handleRegularMessages(message);
            break;
    }
};
