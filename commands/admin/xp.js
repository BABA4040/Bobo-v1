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
  run: async (bot, message, args,data) => {
if(isNaN(args[1])==="on"){
  data.guild.xp.onoff = "on";
      data.guild.save();
     return message.channel.send({content:`antispam status has been update to **on**`})
    
     } else if (args[1] === "off") {
       data.guild.xp.onoff = "off";
        data.guild.save();
     return message.channel.send({content:` Xp system from guild is disabled`})
    }
  
      return message.channel.send({content:`error syntax ${data.guild.prefix} `})
        
  }
};
