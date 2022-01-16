 const CooldownManager = require(`${process.cwd()}/struct/command/Cooldown`);


function cool(command, message, bot, guild, Discord) {
  //const Discord = require("discord.js")
  if (guild) {
    let cooldown = cooldownManager.get(command.name);
/*
    if (!bot.cooldowns.has(command.name)) {
      bot.cooldowns.set(command.name, new Discord.Collection());
    }*/
    const cooldownManager = message.bot.commands.cooldowns;
 
    if (!cooldown){
    cooldownManager.set(command.name, new CooldownManager(command));
  } else {
    // Do nothing..
  };

    //let user = message.author;
    const now = Date.now();
    const timestamps = bot.cooldowns.get(command.name);
    const cooldownAmount = command.cooldown || 2 * 10000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel
          .send({ content: `Please wait ${timeLeft.toFixed(1)} second` })
          .then((msg) => setTimeout(() => msg.delete(), 2000));
      }
    }
    timestamps.set(message.author.id, now);
    if (command) command.run(bot, message);

    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
}
module.exports = {cool};
