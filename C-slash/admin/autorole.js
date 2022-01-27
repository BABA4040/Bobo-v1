const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("autorole")
.setDescription("give role when user jojn")
  .addSubcommand(command=>
                 command.setName("hama"). setDescription ('hu')),
/*.addStringOption(option =>
option.setName('')
.setDescription('')
.setRequired(true)),*/
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    
    
    
    
  }}

    