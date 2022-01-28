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
    
  
  
const { Discord, MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

const { WebhookClient } = require("discord.js");

const data = {
  id: "898151785783508993",
  token: "pNBxD74wVmXvUTdgG5KmEEA_lfrXxorLOZzA96KJ9EY6FDqJd0fOPUrlfPNEXjOI0ag3",
};

const webhookClient = new WebhookClient(data);

/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require('moment');
const cooldown =  new Set();




const channelEmbed = await message.guild.channels.cache.get(guild.plugins.modlogs)

const embed = new discord.MessageEmbed()
    .setThumbnail(message.guild.iconURL())
    .setAuthor(message.guild.name)
    .setDescription(`:pencil: ***Channel Created***`)
    .addField("**Channel Name**", message.name)
    .addField("**Category**", message.parent.name)
    .addField("**Channel Type**", message.type)
    .setTimestamp()
    .setFooter({text:message.guild.name})
    .setColor(color)
  
   if(message.parent && message.type !== 'category')//embed.addField(`Parent Name`, message.parent.name)
  
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err.name)})
            cooldown.add(message.guild.id);
            setTimeout(()=>{
cooldown.delete(message.guild.id)
            }, 3000)
      }

} 
