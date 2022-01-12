module.exports = async (bot, message, command) => {
  let guild = await Guild.findOne({guildID: message.guild.id})
  if(guild){
  if (!bot.cooldowns.has(command.name)) {
    bot.cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = bot.cooldowns.get(command.name);
  const cooldownAmount = command.cooldown || 2 * 1000;
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

  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}};