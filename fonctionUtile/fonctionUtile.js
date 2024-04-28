const { ChannelType } = require('discord.js'); // Importer ChannelType

async function createvoicechannel(message) {
    const channelName = message.content.split(' ').slice(1).join(' ').trim();
    
    console.log(`Nom du salon à créer: '${channelName}'`); // Log pour confirmer le nom du salon

    if (!channelName) {
        return message.reply("Tu dois spécifier un nom pour le salon vocal!");
    }
    


    // Affichage du nom pour vérifier s'il est correct avant de créer le canal
    console.log(`Tentative de création d'un salon vocal avec le nom: '${channelName}'`);

    try {
        // Assurez-vous d'utiliser ChannelType.GuildVoice pour un salon vocal
        const newChannel = await message.guild.channels.create( {
            name: channelName,
            type: ChannelType.GuildVoice,
            parent: 1082366247846551573,
        });

        console.log(`Salon créé avec succès: ${newChannel.name}`);
        message.reply(`Salon vocal créé: ${newChannel.name}`);
    } catch (error) {
        console.error(error);
        message.reply("Je ne peux pas créer ce salon vocal, vérifie que le nom est valide et que j'ai les permissions nécessaires.");
    }
}




async function createtchatchannel(message) {

  const channelName = message.content.split(' ').slice(1).join(' ').trim();
  
  console.log(`Nom du salon à créer: '${channelName}'`); // Log pour confirmer le nom du salon

  if (!channelName) {
      return message.reply("Tu dois spécifier un nom pour le salon vocal!");
  }
  
  // Affichage du nom pour vérifier s'il est correct avant de créer le canal
  console.log(`Tentative de création d'un salon vocal avec le nom: '${channelName}'`);

  try {
      // Assurez-vous d'utiliser ChannelType.GuildVoice pour un salon vocal
      const newChannel = await message.guild.channels.create( {
          name: channelName,
          type: ChannelType.GuildTextChannel,
          parent: 908998681745829929,
      });

      console.log(`Salon créé avec succès: ${newChannel.name}`);
      message.reply(`Salon vocal créé: ${newChannel.name}`);
  } catch (error) {
      console.error(error);
      message.reply("Je ne peux pas créer ce salon vocal, vérifie que le nom est valide et que j'ai les permissions nécessaires.");
  }
}

async function createinvit(message) {
    // Accéder directement au canal du message
    const channel = message.channel;

    // Créer une invitation pour ce canal
    try {
        let invite = await channel.createinvite({
            maxAge: 86400, // durée de l'invitation en secondes (ici 24 heures)
            maxUses: 10   // nombre maximum d'utilisations de l'invitation
        });

        console.log(`Invitation créée: ${invite.url}`);

        // Envoyer l'invitation à l'utilisateur
        message.author.send(`Voici votre invitation : ${invite.url}`);
    } catch (error) {
        console.error(error);
        message.reply("Je ne peux pas créer cette invitation, vérifie que j'ai les permissions nécessaires.");
    }
}



module.exports = {
    createvoicechannel,
    createtchatchannel,
    createinvit
};