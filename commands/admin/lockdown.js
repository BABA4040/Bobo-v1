const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "lockall",
  aliases: ["closeall", "lockall", "lock all"],
  description: "Locks all text channels from your server",
  usage: ["s!lockall"],
  category: ["Moderation"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
    
  
  

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
  }
};
