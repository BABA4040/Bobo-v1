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
  
     let user = await message.mentions.members.first() || message.guild.members.cache.get(args[1]);
let reason = args.slice(3).join('')
  /*  if (!user)
      return message.channel.send({content:`Usage: ban [@User]`}).catch(console.error);
*/
    if (user === message.author.id) {
      return message.channel.send({content:`You can't ban yourself`});
    }

    if (user=== client.user.id) return message.chann


      await user.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.ban({ reason: `Ban Command: ${message.author.tag}: ${reason || 'Unspecified'}`})
    .then(_member => message.channel.send(`Successfully banned **${_member.user.tag}**`))
    .catch((err) => message.channel.send(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));

    

  }
}
