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
  
     let user = args[1]
    if(!Number(user)) return message.channel.send({content:`Please put id be number`})
   let ban = message.guild.bans.fetch(user)
      
      
      if(!ban) return message.channel.send({content:`<This user not found>`})
    
      if(ban){
        message.guild.members.unban(args[1])
      }
      return message.channel.send({content:`Unbanned this user`})
                                      

  
      
    
    
    }
}
