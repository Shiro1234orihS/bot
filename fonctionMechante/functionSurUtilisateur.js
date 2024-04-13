async function disconnect(message) {
    // Récupère le premier utilisateur mentionné
    const mentionedUser = message.mentions.users.first();

    if (!mentionedUser) {
        message.channel.send('Aucun utilisateur mentionné.');
        return;
    }

    // Récupérer le membre du serveur correspondant à l'utilisateur mentionné
    const member = await message.guild.members.fetch(mentionedUser.id);

    // Vérifier si le membre est dans un canal vocal
    if (member.voice.channel) {
        try {
            // Déconnecter le membre du canal vocal
            await member.voice.disconnect('Déconnexion demandée par la commande');
            message.channel.send(`${member.displayName} a été déconnecté du canal vocal.`);
        } catch (error) {
            console.error(error);
            message.channel.send("Je n'ai pas la permission de faire cela!");
        }
    } else {
        // Informer si le membre n'est pas dans un canal vocal
        message.channel.send(`${member.displayName} n'est pas dans un canal vocal!`);
    }
}

async function ban(message) {
    try {
        // Récupération du premier utilisateur mentionné
        const userToBan = message.mentions.users.first();

        if (!userToBan) {
            message.channel.send('Aucun utilisateur mentionné pour le bannissement.');
            return;
        }

        // Récupération du membre du serveur correspondant à l'utilisateur
        const member = await  message.guild.members.fetch(userToBan.id);

        if (!member) {
            message.channel.send('Utilisateur non trouvé sur ce serveur.');
            return;
        }

        // Bannir le membre
        member.ban().then(() => {
            message.channel.send(`L'utilisateur ${userToBan.tag} a été banni.`);
        }).catch(err => {
            message.channel.send('Je n\'ai pas les permissions nécessaires pour bannir cet utilisateur.');
        });

    } catch (error) {
        console.log(error);
        message.channel.send('Attention, il y a une erreur dans la commande.');
    }
}



module.exports = {
    disconnect ,ban
};