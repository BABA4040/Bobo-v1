    const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("unlock")
.setDescription("unlock channel")
  .addChannelOption(option=>
  option.setName('target'). setDescription ('target channel you want unlock')),

  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","MANAGE_CHANNELS"],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS"],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data,channelEmbed) => {
  let channel = await interaction.options.getChannel('target')|| interaction.channel
  //if(!channel) return interaction.reply({content:`You must mention channel`})
  
  channel
      .permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        interaction.reply({content:`channel unlocked`});
     });
    
        /// send to log channel
    
      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **channel Action**`)
    .addField('Moderator Name', interaction.user.tag, true)
    .addField('Channel',channel.name, true)
    .setFooter({text:interaction.guild.name})
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
      
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      
    
    
    
   }
}
