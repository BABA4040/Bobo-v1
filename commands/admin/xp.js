const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "xp",
  aliases: ["xp"],
  description: "enabled and disabled xp system",
  usage: ["Boxp [on/off]"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES","ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {

   let guild = await Guild.findOne({guildID: message.guild.id});
     let num = args[1];
    if (args[1] === "on") {
      guild.xp.onoff = "on";
      guild.save();
      return message.channel.send({content:`antispam status has been update to **on**`})
    
     } else if (args[1] === "off") {
        guild.xp.onoff = "off";
        guild.save();
      return message.channel.send({content:` Xp system from guild is disabled`})
    }
  
      return message.channel.send({content:`error syntax ${guild.prefix} [on,off] `})
        
  }
};
