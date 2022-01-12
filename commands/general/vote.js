const Discord = require("discord.js")
const { Color } = require("../../config.js")
module.exports = {
  name: "vote",
  aliases: ["vote"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
   let embed = new Discord.MessageEmbed()
.setDescription (`[DiscordBotlist](https://discord.ly/bobo)- [Topgg](https://top.gg/bot/920410356034179082/vote)`)
message.channel.send({embeds: [embed]})
}}
