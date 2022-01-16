async function cool(bot,command, message,member){

  const Discord = require("discord.js")
if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
      }
//let user = message.author;
  const now = Date.now();
      const timestamps = bot.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown || 2 * 1000;
      if (timestamps.has(member)) {
        const expirationTime =
          timestamps.get(member) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel.send({content:`Please wait ${timeLeft.toFixed(1)} second`})
            .then(msg =>setTimeout(() => msg.delete(), 2000));
        }
      }
      timestamps.set(member, now);
  
      setTimeout(() => timestamps.delete(member), cooldownAmount);
    
  
  
}
module.exports = cool;