const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
    name: "ban",
    aliases: ["band","ban"],
    description: "You can ban a member, or multiple members using this command",
    usage: ["ban [@User]"],
    category: ["admin"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (client, message, args, dev) => {
  
     let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
let reason = args.slice(3).join('')
    if (!user)
      return message.channel.send({content:`Usage: ban [@User]`}).catch(console.error);

    if (user.id === message.author.id) {
      return message.channel.send({content:`You can't ban yourself`});
    }

    if (user.id === client.user.id) return message.channel.send({content:`I can't ban myself`});

    if (message.guild.ownerId !== message.author.id && user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)
      return message.channel.send({content:`Based on the role hierarchy, you cannot ban this user`});

  //  if (!message.guild.members(user).bannable) return message.channel.send({content:`I cannot ban the mentioned user`});
let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
  
  if (user.id === Ww.worldWhitelist.find((c) => c.id === message.author.id)) return await message.channel.send({content:`You can't ban my devlopers`});



      await user.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.ban({ reason: `MAI Ban Command: ${message.author.tag}: ${reason || 'Unspecified'}`})
    .then(_member => message.channel.send(`Successfully banned **${_member.user.tag}**`))
    .catch(() => message.channel.send(`Failed to ban **${user.user.tag}**!`));

    

  }
}
