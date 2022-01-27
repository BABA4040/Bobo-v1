

const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("lock")
.setDescription("lock channel")
.addChannelOption(option =>
option.setName('target')
.setDescription('target channel')
),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    

   // const data = await Guild.findOne({guildID: message.guild.id})
  let channel = await interaction.options.getChannel('target') || interaction.channel
  if(!channel) return interaction.reply({content:`Mention channel first `})
  channel
      .permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: false
      })
      .then(async() => {
        interaction.reply({content:`channel locked`});
    
        /// send to log channel
    const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Channel Action**`)
    .addField('Moderator Name',interaction.user.tag, true)
    .addField('Channel',channel.name, true)
    .setFooter({text:interaction.guild.name})
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(interaction.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }})
    
     
   }
}
