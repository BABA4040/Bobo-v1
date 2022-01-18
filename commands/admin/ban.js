const Discord = require('discord.js')
const { Color } = require("../../config.js");
const userReg = RegExp(/<@!?(\d+)>/)

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
    run: async (bot, message, args, dev) => {
  
     let user = await message.mentions.members.first() || await message.guild.members.fetch(args[1])
     let admin = message.author;
     // if(!user) return message.channel.send({content:` Mention someone or put id`})
if(user){
  let reason = args.slice(3).join('');
      if(user.id === admin.id){
        return message.channel.send({content:` you can't ban yourself`})
        
      }
      if(user.id === bot.user.id) {
        
        return message.channel.send({content:`🙂 |You want ban me why....!`})
        
      }
    
      
      await user.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.ban({ reason: `Ban Command: ${message.author.tag}: ${reason || 'Unspecified'}`})
    .then(_member => message.channel.send(`Successfully banned **${_member.user.tag}**`))
    .catch((err) => message.channel.send(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));

    

  }
      
    
    
    }
}