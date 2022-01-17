const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
  name: "unlockall",
  aliases: ["openall","unlockall"],
  description: "Unlocks all text channels from your server, not recommended",
  usage: ["s!unlockall"],
  category: ["Moderation"],
  enabled: true,              
  memberPermissions: [ "MANAGE_CHANNELS" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],        
  ownerOnly: false,            
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
  
   
    

    message.guild.channels.cache.filter(c => c.name).forEach(async channel => {
    channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true
      })
       });
        message.channel.send({content:` I locked all channels`}).catch(err =>{
      message.channel.send({content:`I cant locke all ${err.name}`}).catch(err =>{
        message.author.send({content:` i cant lock all channels ${err.name}`})})})

    }
 }
