const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");
const fetch = require("node-fetch")

module.exports = {
  name: "kiss",
  aliases: ["kiss"],
  description: "kiss any one",
  usage: [""],
  category: ["fun"],
  enabled: true,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 3000,
  run: async (bot, message, args, dev, data) => {
    try{
const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
  if (!user) {
   return message.reply({content:`❎ Please mention user to kiss ;-;\n\n**Usage:** \`Bokiss <user>\``
    
   });
  }
  if (message.author === user || message.member == user) {
   return await message.reply({content:`❎ You cant kiss yourself ;-; (Try kissing someone else, your love. Maybe you need some help?)`
    
   });
  }
  
    const response = await fetch("https://nekos.life/api/v2/img/kiss");
    const body = await response.json();
   /* const embed = new Discord.MessageEmbed() // Prettier
     
     .setDescription("So sweeet :3")
     .setImage(body.url)
     .setColor("RANDOM")
    
     .setTimestamp()
     .setURL(body.url);*/
    message.channel.send({content:` ${body.url}`});
    }catch (err) {
     console.log(err)
    message.reply({content: `Something went wrong...`
                   
     })
   }}}
