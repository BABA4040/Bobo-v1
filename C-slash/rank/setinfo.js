const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("setbio")
.setDescription("setbio to profile")
.addStringOption(option =>
option.setName('bio')
.setDescription('bio to your profile ')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["rank"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
const bio = await interaction.options.getString('bio')
    if(bio.includes("https://","http://")) return interaction.reply({content:`The system detected advertising Change your bio text please`})
    if (!bio.length){
      return interaction.reppy({content:`❎ **${interaction.user.tag}**, Please add the text for your bio (max 200 char.)`});
    } else if (bio.length > 200){
      return interaction.reply({content:`❎ **${interaction.user.tag}**, Bio text should not exceed 200 char.`});
    } else {
      data.user.info = bio

      return data.user.save()
      .then(() => interaction.reply({content:`✅ **${interaction.user.tag}**, your bio has been updated!`}))
      .catch(() => interaction.reply({content:`❎ **${interaction.user.tag}**, your bio update failed!`}))
    };}}
    