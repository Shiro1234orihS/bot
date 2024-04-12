async function  disconnect(message){
    

    let member = message.member;
    let mentionedUser = message.mentions.users.first(); // Récupère le premier utilisateur mentio

    console.log(message.mentions.users.first());
    
    
    
    // Vérifier si le membre (mentionné ou non) est dans un canal vocal
    if (mentionedUser && mentionedUser.voice && mentionedUser.voice.channel) {
        try {
           
            // Déconnecter le membre du canal vocal
            await mentionedUser.voice.disconnect('Déconnexion demandée par la commande');
            message.channel.send(`${mentionedUser.displayName} a été déconnecté du canal vocal.`);
        } catch (error) {
            console.error(error);
            message.channel.send("Je n'ai pas la permission de faire cela!");
        }
    } 
    else {
        // Informer si le membre n'est pas dans un canal vocal
        message.channel.send(`${mentionedUser.displayName} n'est pas dans un canal vocal!`);
    }
     
    

    console.log("on est la")
};



module.exports = {
    disconnect // Assure-toi que cette ligne est présente et correctement formatée
};