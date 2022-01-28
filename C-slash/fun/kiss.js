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

    
        try{
const user = await interaction.options.getUser('your_love')
  

  
    const response = await fetch("https://nekos.life/api/v2/img/kiss");
    const body = await response.json();
   const embed = new Discord.MessageEmbed() // Prettier
     
     .setDescription("So sweeet 😘")
     .setImage(body.url)
     .setColor(config.embed.Color)
    
     .setTimestamp()
     .setURL(body.url)
    interaction.reply({embeds:[embed]});
    }catch (err) {
     console.log(err)
    interaction.editReply({content: `Something went wrong...`
                   
     })
    }}}