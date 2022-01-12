const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js")

module.exports = {
  name: "about.js",
  aliases: ["about","botinfo","bot-info"],
  description: "information about bot",
  usage: [".botinfo"],
  category: ["general"],
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  guilOwnerOnly: false,
  cooldown: 10,
  run: async (bot, message, args) => {
let data = await Guild.findOne({guildID: message.guild.id})
       let embed = new Discord.MessageEmbed()
        .setTitle(`${bot.user.username} Information`)
        .setDescription(`This bot has been created by **<@768944616724103170>**`)
        .setColor(Color)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField(`**Bot Name:**`, `${bot.user.tag}`)
        .addField(`**Bot ID**`, `${bot.user.id}`)
        .addField(`**Bot Prefix**`, `${data.prefix}`)
        .addField(`**Discord.js Version**`, `${Discord.version}`)
        .addField(`**Ping**`, `${Math.round(bot.ws.ping)}ms`)
        .addField(`**Guilds**`, `${bot.guilds.cache.size}`)
        
    message.channel.send({embeds: [embed]});
}
}
