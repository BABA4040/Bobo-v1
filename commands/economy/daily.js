const ms = require('ms');
const fs = require("fs");
const pretty = require("pretty-ms")
const Discord = require("discord.js");
module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "To get your daily", 
  usage: ["daily"], 
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 10000,
  run: async (client, message, args, dev,dev2) => {
  
      let data = await User.findOne({ userID: message.author.id });
      if(data.time !== null && 43200000 - (Date.now() - data.time) > 0) return message.reply({content:` You need wait ${ms(43200000 - (Date.now() - data.time))} to daily again`})

      let DR = Math.floor(Math.random() * 2000) + 1000
      
      message.channel.send({content:`**${message.author.username}** you get 💰$\`${DR}\` credits`})
      
      data.time = Date.now();
      data.name = message.author.username
    data.money += parseInt(DR);
    data.save()
  }};
