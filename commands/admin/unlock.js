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
  let channel = await message.channels.mentions.first() || message.channel
  channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.channel.send({content:`channel locked`});
     });
   }
}
