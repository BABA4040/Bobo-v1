const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("kick")
.setDescription("kick user")
.addUserOption(option =>
option.setName('target')
.setDescription('target user to kick')
.setRequired(true))
.addStringOption(option=>
option.setName('reason')
.setDescription (`Reason of kick`)),
  
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","KICK_MEMBERS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","KICK_MEMBERS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
     let user = await interaction.options.getUser('target')
     
     
      let reason = await interaction.options.getString('reason');
      const member = await interaction.guild.members.fetch(user.id).catch(() => {});
if(member){
    
  
    const memberPosition = member.roles.highest.position;
			const moderationPosition = interaction.member.roles.highest.position;
			if(interaction.member.ownerId !== interaction.user.id && !(moderationPosition > memberPosition)){
				return interaction.followUp({content:`You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `})
			}
			if(!member.kickable) {
				return interaction.reply({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
		////// send to log channel
      const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Kick Action**`)
    .addField('Moderator Name', interaction.user.tag, true)
    .addField('User kicked',member.user.tag, true)
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
      }}
        
      await user.send(`**${interaction.user.tag}**kicked you from ${interaction.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return member.kick({ reason: `Kick Command: ${interaction.user.tag}: ${reason || 'Unspecified'}`})
    .then(_member => interaction.reply(`Successfully Kicked **${_member.user.tag}**`))
    .catch((err) => interaction.editReply(`Failed to ban **${member.user.tag} : reason: Your role not high than this member or ${err.name}**!`));



  


    
    
    }
}
