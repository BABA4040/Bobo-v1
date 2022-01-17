   module.exports = {
  name: "resetroles",
  aliases: ["resetroles", "resetrole"],
  description: "reseroles of your user want",
  usage: ["resetroles"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_ROLES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_ROLES"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data,[member = '']) => {
    



if (!member.match(/\d{17,19}/)){
      return message.channel.send({content:`\\❌ | ${message.author}, Please provide the ID or mention the user to kick. [mention first before adding the reason]`});
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send({content:`\\❌ Unable to reset roles of the user: User not found.`});
    } else if (member.id === bot.user.id){
      return message.channel.send({content:`\\❌ ${message.author}, I do not recommend resetting my roles!`});
    } else if (member.user.bot){
      return message.channel.send({content:`\\❌ ${message.author}, I do not recommend resetting bot roles! (Might affect role integration)`});
    } else if (message.member.id === member.id){
      return message.channel.send({content:`\\❌ ${message.author}, You cannot reset your own roles!`});
    } else if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send({content:`\\❌ ${message.author}, You cannot modify roles of user who has of higher permission than yours!`});
    } else if (!Boolean(member.roles.cache.size - 1)){
      return message.channel.send({content:`\\❌ ${message.author}, **${member.user.tag}** has no roles to remove from.`});
    };

    await message.channel.send({content:`This will remove all of **${member.user.tag}**'s roles, including special roles like mute role. Continue?`});

    const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel.awaitMessages(filter, options)
    .then(collected => ['y','yes'].includes(collected.first().content.toLowerCase()) ? true : false)
    .catch(() => false);

    if (!proceed){
      return message.channel.send({content:`\\❌ | **${message.author.tag}**, you cancelled the resetrole command!`});
    };

    const prevRoleCount = member.roles.cache.size - 1;
    return member.roles.set([])
    .then(member => message.channel.send(`\\✔️ Successfully removed **${prevRoleCount}** roles from **${member.user.tag}**!`))
    .catch(() => message.channel.send(`\\❌ Unable to remove all of **${member.user.tag}**'s roles!`))
  }}