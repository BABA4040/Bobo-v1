const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
data: new SlashCommandBuilder()
.setName("kiss")
.setDescription("kiss 😘")
.addUserOption(option =>
option.setName('your_love')
.setDescription('Target 🎯 your love')
),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    