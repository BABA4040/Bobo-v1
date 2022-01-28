const Discord = require('discord.js')
const { Color } = require("../../config.js");


module.exports = {
    name: "ban",
    aliases: ["band","ban"],
    description: "You can ban a member, or multiple members using this command",
    usage: ["ban [@User]"],
    category: ["admin"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev) => {
      
  let data = await Guild.findOne({guildID: message.guild.id})
  
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
			if(!member.bannable) {
				return message.channel.send({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
		
      const channelEmbed = await message.guild.channels.cache.get(data.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Ban Action**`)
    .addField('Moderator Name', message.author.toString(), true)
    .addField('User banned',member.user.username, true)
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
        
      await user.send(`**${message.author.tag}** banned you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

   return  user.ban({ reason: `Ban Command: ${reason || 'Unspecified'}`})
    .then(_member => message.channel.send({content:`Successfully banned **${_member.user.tag}**`}))
    .catch((err) => message.channel.send({content:`Failed to ban **${user.user.tag}`}))
  


    
    
    }
}
