const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("setbio")
.setDescription("")
.addStringOption(option =>
option.setName('')
.setDescription('')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
const bio = await interaction.options.getString('bio')
    if(bio.includes("https://")) return message.channel.send({content:`The system detected advertising Change your bio text please`})
    if (!bio.length){
      return message.channel.send({content:`❎ **${message.author.tag}**, Please add the text for your bio (max 200 char.)`});
    } else if (bio.length > 200){
      return message.channel.send({content:`❎ **${message.author.tag}**, Bio text should not exceed 200 char.`});
    } else {
      doc.info = bio

      return doc.save()
      .then(() => message.channel.send({content:`✅ **${message.author.tag}**, your bio has been updated!`}))
      .catch(() => message.channel.send({content:`❎ **${message.author.tag}**, your bio update failed!`}))
    };}}
    