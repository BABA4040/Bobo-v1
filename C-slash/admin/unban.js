const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("unban")
.setDescription("unabn user")
.addStringOption(option =>
option.setName('id')
.setDescription('id of user you want unbanned')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","BAN_MEMBERS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","BAN_MEMBERS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    let user = await interaction.options.getString("id")
let ban = await interaction.guild.bans.fetch(user).catch(()=>{return 
               interaction.reply({content:`<This user not found>`})
              });
      if(ban){
        interaction.guild.members.unban(user).catch(()=>{return interaction.reply({content:`User not found`})})
                                                  
                                                        
          /// send to log channel
    const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role disabled**`)
    .addField('Moderator Name',interaction.user.tag, true)
    //.addField('Role Name',role.name, true)
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
      }
      
      
      return interaction.reply({content:`Unbanned this user`})
                                      

  
      }  

  }}