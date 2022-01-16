 ///const CooldownManager = require(`${process.cwd()}/struct/command/Cooldown`);
 const bot = require(`${process.cwd()}/server.js`)

async function cool(command, message,  guild, Discord) {
  //const Discord = require("discord.js")
  if (guild) {
  

    if (!comm{
      bot.cooldowns.set(command.name, new Discord.Collection());
    }
   /// const cooldownManager = message.bot.commands.cooldowns;
 
  

    //let user = message.author;
    const now = Date.now();
    const timestamps = this.cooldowns.get(command.name);
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
  //№if (command) command.run(bot, message);

    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
}
module.exports = cool;
