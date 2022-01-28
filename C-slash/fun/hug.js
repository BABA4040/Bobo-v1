const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")

module.exports = {
data: new SlashCommandBuilder()
.setName("hug")
.setDescription("hug your gf or friends or hug your self")
.addUserOption(option =>
option.setName('target')
.setDescription('target user')),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    try{
    const user = await interaction.options.getUser('target')

    
    if (user == bot.user) {
     return interaction.reply({content:`❎ Oh, you tried to hug me but u can't... Im not real... But I can hug you ＼( ^o^ )／`,
      
     });
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new Discord.MessageEmbed() // Prettier
     
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
    .setDescription(" got a hug")
     
     .setTimestamp()
     .setURL(body.url);
  interaction.reply({embeds:[embed]});
   } catch (err) {
    interaction.editReply({content:`Something went wrong... `,
     
    });
   }}}