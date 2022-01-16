const messagess = require(`${process.cwd()}/events/messageCreate`)
async function hama(message, bot, Discord, guild, data) {
  if (guild) {
    if (!message.content.toLowerCase().startsWith(guild.prefix.toLowerCase()))
      return;
    let args = message.content.split(" ");
    const argsr = message.content
      .slice(guild.prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = argsr.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;
    if (!command) return;
    if (!command.enabled)
      return await message.channel.send({
        content: `This command is **Disable** for now`,
      });
    let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
    data.ww = Ww;
    if (
      command.ownerOnly &&
      !Ww.worldWhitelist.find((c) => c.type === message.author.id)
    )
      return await message.channel.send({
        content: `This command is only for owner the bot`,
      });
    if (command.guilOwnerOnly) {
      if (
        message.author.id !== message.guild.ownerId &&
        !Ww.worldWhitelist.find((c) => c.type === message.author.id)
      )
        return message.channel.send({
          content: `This command is only for guildOwner`,
        });
    }
    let neededPermissions = [];
    if (!command.botPermissions.includes("EMBED_LINKS")) {
      command.botPermissions.push("EMBED_LINKS");
    }

    command.botPermissions.forEach((perm) => {
      if (!message.channel.permissionsFor(bot.user).has(perm)) {
        neededPermissions.push(perm);
      }
    });
    if (neededPermissions.length > 0) {
      return message.channel.send({
        content: `I don't have a ${neededPermissions
          .map((p) => `\`${p}\``)
          .join(", ")} permissions`,
      });
    }

    neededPermissions = [];
   /// if (Array.isArray(command.memberPermissions)) {
      command.memberPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.member).has(perm)) {
          neededPermissions.push(perm);
        }
      });
      if (neededPermissions.length > 0) {
        return message.channel.send({
          content: `You don't have a ${neededPermissions
            .map((p) => `\`${p}\``)
            .join(", ")} permissions`,
        });
      }
    

    if (command.botPermissions) {
      let perms = new Discord.MessageEmbed().setDescription(
        `i don't Have ${command.botPermissions} To Run Command..`
      );
      if (!message.guild.me.permissions.has(command.botPermissions || []))
        return message.channel.send({ embeds: [perms] });
    }
    let prefix = guild.prefix
   if (command) command.run(bot, message, args, prefix, data, cmd);
 //////////
    
      if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
      }

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

 ///nothing 
  
}}

module.exports = hama;
