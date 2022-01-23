const Discord = require("discord.js")
	
const Resolvers = require("../../helpers/resolvers.js")
module.exports = {
  name: "autorole",
  aliases: ["autorole"],
  description: "set autorole for new member when join it",
  usage: ["autorole"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["MANAGE_ROLES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_ROLES"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev,prefix,cooldown) => {
    
  
let data = await Guild.findOneAndUpdate({guildID: message.guild.id})

let role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[2])

const status = args[1];
		if(status !== "on" && status !== "off"){
			return message.channel.send({content:`Please specify a valid value between **on** and **off**`})
		}
        
		if(status === "on"){
/*
			const role = await Resolvers.resolveRole({
			message,
				search: args.slice(1).join(" ")
			});*/
   ///   let role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
			if(!role){
				return message.channel.send({content:`Please specify a valid role!`})
			}

			data.plugins.autorole = {
				enabled: true,
				role: role.id
			};
			data.markModified("plugins.autorole");
			await data.save();

			message.channel.send({content:`Autorole enabled! New members will automatically receive the **${role.name}** role.`})
      
     const channelEmbed = await message.guild.channels.cache.get(data.plugins.modlogs)

      
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role enabled**`)
    .addField('Moderator Name', message.author.tag, true)
    .addField('Role Name',role.name, true)
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

		if(status === "off"){

			if(!data.plugins.autorole.enabled){
				return message.channel.send({content:`**The autorole is already disabled.**\n\n:arrow_right_hook: *Send ${prefix}autorole on @YourRole to enable it again!*`})
			}

			data.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.markModified("plugins.autorole");
			await data.save();
            
			message.channel.send({content:`
      
      The autorole is already disabled.**\n\n:arrow_right_hook: *Send ${prefix}autorole on @YourRol to enable it again!*

      
      
`})
    const channelEmbed = await message.guild.channels.cache.get(data.plugins.modlogs)

      
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role disabled**`)
    .addField('Moderator Name', message.author.user.tag, true)
    //.addField('Role Name',role.name, true)
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
        
  }	}