const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "lockdown",
  aliases: ["closeall", "lockall", "lock all","lockdown"],
  description: "Locks all text channels from your server",
  usage: ["s!lockall"],
  category: ["Moderation"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev,data) => {
    
  
  

    message.guild.channels.cache
      .filter((c) => c.type ==="GUILD_TEXT")
      .forEach(async (channel) => {
        channel.permissionOverwrites.edit(message.guild.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
      });
    message.channel.send({content:` I locked all channels`}).catch(err =>{
      message.channel.send({content:`I cant locke all ${err.name}`}).catch(err =>{
        message.author.send({content:` i cant lock all channels ${err.name}`})})})
        /// send to log channel
    const channelEmbed = await message.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Lockdown Action**`)
    .addField('Moderator Name', message.author.toString(), true)
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
};
