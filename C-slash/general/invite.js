const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("invite")
.setDescription("invite link")
,
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
      .setColor(Color)
      .setTitle("**Bobo Bot**  InviteLink!")
      .setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands`
)
     
      
      interaction.reply({embeds:[embed]})
      }}
