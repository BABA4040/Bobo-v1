const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
    name: "unban",
    aliases: ["unband","unban"],
    description: "You can unban a member, or multiple members using this command",
    usage: ["ban [@User]"],
    category: ["admin"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev,data) => {
  
     let user = args[1]
    if(!Number(user)) return message.channel.send({content:`Please put id be number`})
   let ban = message.guild.bans.fetch(user)
      
      
      if(!ban) return message.channel.send({content:`<This user not found>`})
    
      if(ban){
        message.guild.members.unban(args[1])
      }
          /// send to log channel
    const channelEmbed = await message.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role disabled**`)
    .addField('Moderator Name', message.author.toString(), true)
    //.addField('Role Name',role.name, true)
    .setFooter({text:message.guild.name})
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }
      
      
      return message.channel.send({content:`Unbanned this user`})
                                      

  
      
    
    
    }
}
