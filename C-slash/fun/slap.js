const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")
module.exports = {
data: new SlashCommandBuilder()
.setName("slap")
.setDescription("slap yourself or user 👋")
.addUserOption(option =>
option.setName('target_slap')
.setDescription('mention someone')),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    try {
   const member = await interaction.options.getUser('target_slap')
   
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new Discord.MessageEmbed() // Prettier
     .setColor(config.embed.Color)
  
     .setImage(body.url);
    interaction.reply({embeds:[embed]});
   
  } catch (err) {
   interaction.editReply({content:`Something went wrong... `});
  }}}