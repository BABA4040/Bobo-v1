    const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("lockdown")
.setDescription("Lock all channels for antiraid")
.addStringOption(option =>
option.setName('')
.setDescription('')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","MANAGE_CHANNELS"],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data,channelEmbed) => {

    
    

  

    interaction.guild.channels.cache
      .filter((c) => c.type ==="GUILD_TEXT")
      .forEach(async (channel) => {
        channel.permissionOverwrites.edit(interaction.guild.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: true,
        });
      });
  interaction.reply({content:` I locked all channels`}).catch(err =>{
      interaction.editReply({content:`I cant locke all ${err.name}`})})
        /// send to log channel
  
      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Lockdown Action**`)
    .addField('Moderator Name', interaction.user.tag, true)
    .setFooter({text:interaction.guild.name})
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
     channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(async()=>{

interaction.guild.channels.cache.filter((c)=>c.type==="GUILD_TEXT").forEach(async
              
          
              
            }, 3000)
      
    
  }
};
