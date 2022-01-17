const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
  name: "lockall",
  aliases: ["closeall","lockall","lock all"],
  description: "Locks all text channels from your server",
  usage: ["s!lockall"],
  category: ["Moderation"],
  enabled: true,              
  memberPermissions: [ "MANAGE_CHANNELS" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],        
  ownerOnly: false,            
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
    if(message.guild.channels.cache.filter(c=> c.name).forEach(async channel=>{
      channel.permissionOverwrites.has(message.guild.id,{
        SEND_MESSAGES: false})})) return message.channel.send({content:` already channel locked`})
      
   
      const embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(`I locked all channels`);
      message.channel.send({embeds:[embed]});

    message.guild.channels.cache.filter(c => c.name).forEach(async channel => {
    channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false
      })
       });
    }
 }
