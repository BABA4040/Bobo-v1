
const Discord = require("discord.js")
const moment = require("moment")
moment.suppressDeprecationWarnings = true;
const news =require(`../../data/news.js`);
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("news")
.setDescription("weekly my devlopera publish news"),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {




      
let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setTitle(`Bobo News`)
    .setDescription(`***__Date Published__ ${moment(data.news.time).format("dddd, MMMM Do YYYY")}*** \n**__[\`${moment(data.news.time).fromNow()}\`]__**\n\n ${data.news.news}`)
  
      .setFooter('Bobot Teams')
      .setTimestamp();
    interaction.reply({embeds:[embed]});
    
    
    
    
  }}
