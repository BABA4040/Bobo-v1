const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
  name: "unlock",
  aliases: ["open","unlock"],
  description: "open he current or selected text channels",
  usage: ["[Prefix]lock"],
  category: ["admin"],
  enabled: true,			  
  memberPermissions: [ "MANAGE_CHANNELS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
  let channel = await message.mentions.channels.first() || message.channel
  if(!channel) return message.channel.send({content:`You must mention channel`})
  
  channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.channel.send({content:`channel unlocked`});
     });
    
        /// send to log channel
    const channelEmbed = await message.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **channel Action**`)
    .addField('Moderator Name', message.author.toString(), true)
    .addField('Channel',channel.name, true)
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
    
    
    
   }
}
