const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("ga")
.setDescription("Info about the bot and its creator!"),		    
  memberPermissions: [ "SEND_MESSAGES","MANAGE_GUILD","ADMINISTRATOR" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (bot, message, args, dev) => {
    
    
  }}

