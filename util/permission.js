async function hama(message, bot, Discord, command) {
  const data = {};
  if (!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;
  if (command.enabled === false)
    return await message.channel.send({
      content: `This command is **Disable** for now`,
    });
  let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
  data.ww = Ww;
  if (
    command.ownerOnly !== Ww.ownerCode &&
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
  if (Array.isArray(command.botPermissions)) {
    if (!command.botPermissions.includes("EMBED_LINKS")) {
      command.botPermissions.push("EMBED_LINKS");
    }
  }
  if (Array.isArray(command.botPermissions)) {
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
  }
  neededPermissions = [];
  if (Array.isArray(command.memberPermissions)) {
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
  }

  if (Array.isArray(command.botPermissions)) {
    if (command.botPermissions) {
      let perms = new Discord.MessageEmbed().setDescription(
        `i don't Have ${command.botPermissions} To Run Command..`
      );
      if (!message.guild.me.permissions.has(command.botPermissions || []))
        return message.channel.send({ embeds: [perms] });
    }
  }
}
module.exports = hama;
