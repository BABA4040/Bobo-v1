const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = require("../../config.js")
module.exports = {
data: new SlashCommandBuilder()
.setName("kick")
.setDescription("kick user")
.addStringOption(option =>
option.setName('')
.setDescription('')
.setRequired(true)),
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
     let user = await message.mentions.members.first() || await message.guild.members.fetch(args[1])
     
      let reason = args.slice(1).join(" ");
      const member = await message.guild.members.fetch(user.id).catch(() => {});
if(member){
    
  
    const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerId !== message.author.id && !(moderationPosition > memberPosition)){
				return message.channel.send({content:`You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `})
			}
			if(!member.kickable) {
				return message.channel.send({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
		////// send to log channel
      const channelEmbed = await message.guild.channels.cache.get(data.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Kick Action**`)
    .addField('Moderator Name', message.author.toString(), true)
    .addField('User kicked',member.user.username, true)
    .setFooter({text:message.guild.name})
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }}
        
      await user.send(`**${message.author.tag}**kicked you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.kick({ reason: `Kick Command: ${message.author.tag}: ${reason || 'Unspecified'}`})
    .then(_member => message.channel.send(`Successfully Kicked **${_member.user.tag}**`))
    .catch((err) => message.channel.send(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));



  


    
    
    }
}
