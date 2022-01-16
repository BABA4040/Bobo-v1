async function cool(bot,command, message){
  
  const now = Date.now();
      const timestamps = bot.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown || 2 * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel
            .send({content:`Please wait ${timeLeft.toFixed(1)} second`})
            .then(msg =>setTimeout(() => msg.delete(), 2000));
        }
      }
      timestamps.set(message.author.id, now);
  
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
  
  
}
module.exports = cool;