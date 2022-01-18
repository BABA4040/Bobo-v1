const Discord = require('discord.js')
const { Color } = require("../../config.js");
const userReg = RegExp(/<@!?(\d+)>/)

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
    run: async (bot, message, args, dev) => {
  
     let user =  await message.guild.members.fetch(args[1])
     
    message.guild.ban.fetch(user).then(ban =>{
      
      
      ban.unban
                                       
                                       
      
      
      
    })
      
      
      
      
                                      

  
      
    
    
    }
}
